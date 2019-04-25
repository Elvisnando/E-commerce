package it.digitalgarage.template.service;

import it.digitalgarage.template.dto.*;
import it.digitalgarage.template.entity.*;
import it.digitalgarage.template.repository.*;
import it.digitalgarage.template.util.exception.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.naming.NameNotFoundException;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class RegistrationService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BuyerRepository buyerRepository;
    @Autowired
    private MerchantRepository merchantRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private ProducerRepository producerRepository;
    @Autowired
    private SmtpMailSender mailSender;
    @Autowired
    private CoinRepository coinRepository;

    public void checkEveryFieldAndThenSave(RegistrationRequestBodyDto registrationRequestBodyDto) throws FieldNotValidException, UserDtoNotAccordantException, MessagingException {
        String errors = "";

        if (registrationRequestBodyDto == null) {
            throw new UserDtoNotAccordantException("Trying to register a User without providing a correct User Entity");
        }

        if (userRepository.findUserByEmail(registrationRequestBodyDto.getUserDto().getEmail()) != null) {
            errors+="<br/>User already registered";
        }

        if (!checkPassword(registrationRequestBodyDto.getUserDto().getPassword())) {
            errors+="<br/>Password did not meet the complexity required";
        }

        if(!checkNames(registrationRequestBodyDto.getUserDto().getName())){
            errors+="<br/>Name only with chars";
        }

        if(registrationRequestBodyDto.getBuyerDto() != null && registrationRequestBodyDto.getBuyerDto().getSurname() != null){
            if(!checkNames(registrationRequestBodyDto.getBuyerDto().getSurname())){
                errors+="<br/>Surname only with chars";
            }
        }

        if(registrationRequestBodyDto.getBuyerDto() != null && registrationRequestBodyDto.getBuyerDto().getBirthday() != null){
            if(!checkData(LocalDate.parse(registrationRequestBodyDto.getBuyerDto().getBirthday()))){
                errors+="<br/>Inserted date after today";
            }
        }

        if (registrationRequestBodyDto.getUserDto().isBusiness()){
            if(registrationRequestBodyDto.getUserDto().isMerchant()) {
                if(!checkPiva(registrationRequestBodyDto.getMerchantDto().getPiva())){
                    errors+="<br/>piva only with numbers";
                }
                if(!checkAddress(registrationRequestBodyDto.getMerchantDto().getAddress())){
                    errors+="<br/>Address only with numbers and chars";
                }
            }

            if(registrationRequestBodyDto.getUserDto().isProducer()) {
                if(!checkPiva(registrationRequestBodyDto.getProducerDto().getPiva()) && !checkAddress(registrationRequestBodyDto.getProducerDto().getAddress())){
                    errors+="<br/>piva only with numbers";
                }
                if(!checkAddress(registrationRequestBodyDto.getProducerDto().getAddress())){
                    errors+="<br/>Address only with numbers and chars";
                }
            }

            if(registrationRequestBodyDto.getUserDto().isRestaurant()) {
                if(!checkPiva(registrationRequestBodyDto.getRestaurantDto().getPiva()) && !checkAddress(registrationRequestBodyDto.getRestaurantDto().getAddress())){
                    errors+="<br/>piva only with numbers";
                }
                if(!checkAddress(registrationRequestBodyDto.getRestaurantDto().getAddress())){
                    errors+="<br/>Address only with numbers and chars";
                }
            }
        }

        if(coinRepository.findAllByAvailableIsTrue().isEmpty()){
            errors+="<br/>No PentaCoin addresses available, please contact the administrator";
        }

        if(errors != ""){
            throw new FieldNotValidException(errors);
        } else {
            saveUser(registrationRequestBodyDto);
        }


    }


    public void saveUser(RegistrationRequestBodyDto registrationRequestBodyDto) throws MessagingException {
        System.out.println("Registering new User");
        String confirmToken = UUID.randomUUID().toString().replace("-", "");
        Long userId = saveUserInstance(registrationRequestBodyDto.getUserDto(), confirmToken);

        if (registrationRequestBodyDto.getUserDto().isBusiness()) {
            if (registrationRequestBodyDto.getUserDto().isMerchant()) {
                saveMerchant(userId, registrationRequestBodyDto.getMerchantDto());
                }
            if (registrationRequestBodyDto.getUserDto().isProducer()) {
                saveProducer(userId, registrationRequestBodyDto.getProducerDto());

            }
            if (registrationRequestBodyDto.getUserDto().isRestaurant()) {
                saveRestaurant(userId, registrationRequestBodyDto.getRestaurantDto());
                }

        } else {
            saveBuyer(userId, registrationRequestBodyDto.getBuyerDto());
        }

        mailSender.sendConfirm(registrationRequestBodyDto.getUserDto().getName(), registrationRequestBodyDto.getUserDto().getEmail(), confirmToken);
    }

    public void saveRestaurant(Long userId, RestaurantDto restaurantDto) {
        Restaurant restaurant = Restaurant.builder()
                .address(restaurantDto.getAddress())
                .id(userId)
                .piva(restaurantDto.getPiva())
                .build();
        restaurantRepository.save(restaurant);
    }

    public void saveMerchant(Long userId, MerchantDto merchantDto) {
        System.out.println("saving merchant");
        Merchant merchant = Merchant.builder()
                .address(merchantDto.getAddress())
                .id(userId)
                .piva(merchantDto.getPiva())
                .build();
        merchantRepository.save(merchant);
    }

    public void saveProducer(Long userId, ProducerDto producerDto) {
        System.out.println("saving seller");
        Producer producer = Producer.builder()
                .address(producerDto.getAddress())
                .id(userId)
                .piva(producerDto.getPiva())
                .build();
        producerRepository.save(producer);
    }

    public void saveBuyer(Long userId, BuyerDto buyerDto) {
        Buyer buyer = Buyer.builder()
                .surname(buyerDto.getSurname())
                .id(userId)
                .birthday(LocalDate.parse(buyerDto.getBirthday()))
                .build();
        System.out.println("saving buyer");
        buyerRepository.save(buyer);
        System.out.println("Buyer saved");
    }

    public void saveBuyerForBusiness(Long userId, String nameToSave) {
        Buyer buyer = Buyer.builder()
                .id(userId)
                .build();
        System.out.println("saving buyer for business");
        buyerRepository.save(buyer);
        System.out.println("Buyer saved");
    }

    public Long saveUserInstance(UserDto userDto, String confirmToken) {
        User user = User.builder()
                .isBusiness(userDto.isBusiness())
                .isMerchant(userDto.isMerchant())
                .isRestaurant(userDto.isRestaurant())
                .isProducer(userDto.isProducer())
                .isAdmin(userDto.isAdmin())
                .inRecovery(false)
                .question(userDto.getQuestion())
                .answer(userDto.getAnswer())
                .email(userDto.getEmail())
                .name(userDto.getName())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .confirmToken(confirmToken)
                .isActive(false)
                .build();
        user = userRepository.save(user);
        System.out.println("User saved with id " + user.getId());

        //Assigning available address to new user
        CoinAddresses assigningAddress = coinRepository.findAllByAvailableIsTrue().get(0);
        assigningAddress.setUserID(user.getId());
        assigningAddress.setAvailable(false);

        coinRepository.save(assigningAddress);

        return user.getId();
    }

    public void confirmRegistration(String token) throws UserNotFoundByTokenException, UserAlreadyActiveException {
        User user = userRepository.findUserByConfirmToken(token);
        if (user == null) throw new UserNotFoundByTokenException(token);
        if (user.isActive()) throw new UserAlreadyActiveException();
        user.setActive(true);
        userRepository.save(user);

    }


    public boolean checkNames (String name) {
        if(!name.matches("[a-zA-Z ]+")){
            return false;
        }
    return true;
    }

    public boolean checkAddress (String address) {
        if(!address.matches("(?i)[a-z0-9\\s]+")){
            return false;
        }
        return true;
    }

    public boolean checkPiva (String piva) {
        if(!piva.matches("[0-9]+")){
            return false;
        }
        return true;
    }

    public boolean checkPassword (String password)  {
        String pattern = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$%^&+=])(?=\\S+$).{8,}";
        if(!password.matches(pattern)){
            return false;
        }
        return true;
        /*

            (?=.*[0-9]) a digit must occur at least once
            (?=.*[a-z]) a lower case letter must occur at least once
            (?=.*[A-Z]) an upper case letter must occur at least once
            (?=.*[@#$%^&+=]) a special character must occur at least once
            (?=\\S+$) no whitespace allowed in the entire string
            .{8,} at least 8 characters

         */
    }

    public boolean checkData(LocalDate dateToCheck){
        LocalDate currentDate = LocalDate.now();
        if(dateToCheck.isAfter(currentDate)){
            return false;
        }
        return true;
    }

}
