package it.digitalgarage.template.service;

import it.digitalgarage.template.dto.*;
import it.digitalgarage.template.entity.*;
import it.digitalgarage.template.repository.*;
import it.digitalgarage.template.util.exception.CannotRemoveAdminUserException;
import it.digitalgarage.template.util.exception.RemoveUserException;
import it.digitalgarage.template.util.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BuyerRepository buyerRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private MerchantRepository merchantRepository;
    @Autowired
    private ProducerRepository producerRepository;
    @Autowired
    private PaymentInfoRepository paymentInfoRepository;
    @Autowired
    private ShippingInfoRepository shippingInfoRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //Removing user from admin panel
    public void removeUser (Long userId) throws CannotRemoveAdminUserException, RemoveUserException, UserNotFoundException {
        User user = userRepository.findById(userId);
        if(user == null){
            throw new UserNotFoundException("User not found in the db");
        }
        // REMOVE FROM OTHER TABLES WITH SWITCH

        if (user.isAdmin()) {

            // HANDLE ADMIN

        } else if (user.isBusiness()) {
            if (user.isMerchant()) {
                Merchant merchantToRemove = merchantRepository.findById(userId);
                if(merchantToRemove == null){
                    throw new RemoveUserException("Could not remove merchant");
                }
                merchantRepository.delete(merchantToRemove);
            }
            if (user.isProducer()) {
                Producer producerToRemove = producerRepository.findById(userId);
                if(producerToRemove == null){
                    throw new RemoveUserException("Could not remove Producer");
                }
                producerRepository.delete(producerToRemove);
            }
            if (user.isRestaurant()) {
                Restaurant restaurantToRemove = restaurantRepository.findById(userId);
                if(restaurantToRemove == null){
                    throw new RemoveUserException("Could not remove restaurant");
                }
                restaurantRepository.delete(restaurantToRemove);
            }
        } else {
            Buyer buyerToRemove = buyerRepository.findById(userId);
            if(buyerToRemove == null) {
                throw new RemoveUserException("Could not remove buyer user");
            }
            buyerRepository.delete(buyerToRemove);
        }
        userRepository.delete(user);
    }

    //adding new product to db
    //TO DO check on product already in db
    public void addNewProduct(ProductDto productToAdd){
        Product productAdd = Product.builder()
                .availability(productToAdd.getAvailability())
                .description(productToAdd.getDescription())
                .productionDate(LocalDate.parse(productToAdd.getProductionDate()))
                .name(productToAdd.getName())
                .region(productToAdd.getRegion())
                .price(productToAdd.getPrice())
                .category(productToAdd.getCategory())
                .build();

        productRepository.save(productAdd);

    }

    //removing product from db
    public void removeProduct(Long productId){
        Product productRemove = productRepository.findById(productId);
        // REMOVE FORM ALL CARTS, BUT NOT FROM USER PURCHASES
        productRepository.delete(productRemove);
    }

    //retrieving list of products from db
    public List<ProductDto> listProducts(){
        return productRepository.findAll()
                .stream()
                .map(s -> ProductDto.builder()
                        .id(s.getId())
                        .name(s.getName())
                        .productionDate(s.getProductionDate().toString())
                        .region(s.getRegion())
                        .availability(s.getAvailability())
                        .price(s.getPrice())
                        .sellerId(s.getSellerId())
                        .description(s.getDescription())
                        .category(s.getCategory())
                        .build()).collect(Collectors.toList());
    }

    public List<UserDto> listUsers (){
        return userRepository.findAll()
                .stream()
                .map(s -> UserDto.builder()
                        .id(s.getId())
                        .email(s.getEmail())
                        .isBusiness(s.isBusiness())
                        .isAdmin(s.isAdmin())
                        .isMerchant(s.isMerchant())
                        .isProducer(s.isProducer())
                        .isRestaurant(s.isRestaurant())
                        .build())
                        .collect(Collectors.toList());
    }

    public RegistrationRequestBodyDto getUser(String email) {
        User user = userRepository.findUserByEmail(email);
        MerchantDto merchantDto = null;
        ProducerDto producerDto = null;
        RestaurantDto restaurantDto = null;

        if (user.isBusiness()) {
            if (user.isMerchant()) {
                Merchant merchant = merchantRepository.findById(user.getId());
                merchantDto = MerchantDto.builder()
                        .address(merchant.getAddress())
                        .piva(merchant.getPiva())
                        .build();
            }
            if (user.isProducer()) {
                Producer producer = producerRepository.findById(user.getId());
                producerDto = ProducerDto.builder()
                        .address(producer.getAddress())
                        .piva(producer.getPiva())
                        .build();
            }
            if (user.isRestaurant()) {
                Restaurant restaurant = restaurantRepository.findById(user.getId());
                restaurantDto = RestaurantDto.builder()
                        .address(restaurant.getAddress())
                        .piva(restaurant.getPiva())
                        .build();
            }
            return RegistrationRequestBodyDto.builder()
                    .restaurantDto(restaurantDto)
                    .merchantDto(merchantDto)
                    .producerDto(producerDto)
                    .build();

        } else {
            Buyer buyer = buyerRepository.findById(user.getId());
            BuyerDto buyerDto = BuyerDto.builder()
                    .birthday(buyer.getBirthday().toString())
                    .surname(buyer.getSurname())
                    .build();
            return RegistrationRequestBodyDto.builder()
                    .buyerDto(buyerDto)
                    .build();
        }
    }

    public List<PaymentInfoDto> getPaymentInfo(String email) {
        User user = userRepository.findUserByEmail(email);
        return paymentInfoRepository.findByUserId(user.getId())
                .stream()
                .map(s -> PaymentInfoDto.builder()
                        .address(s.getAddress())
                        .cardNumber(s.getCardNumber())
                        .cardOwner(s.getCardOwner())
                        .cvv(s.getCvv())
                        .expiryDate(s.getExpiryDate().format(DateTimeFormatter.ofPattern("MM/yy")))
                        .build())
                .collect(Collectors.toList());
    }

    public List<ShippingInfoDto> getShippingInfo(String email) {
        User user = userRepository.findUserByEmail(email);
        return shippingInfoRepository.findByUserId(user.getId())
                .stream()
                .map(s -> ShippingInfoDto.builder()
                        .address(s.getAddress())
                        .build())
                .collect(Collectors.toList());
    }

    public void modifyUser(Long id, UserInfoDto userInfoDto) {
        User user = userRepository.findById(id);
        Buyer buyer = buyerRepository.findById(id);

        if (userInfoDto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(userInfoDto.getPassword()));
        }

        //buyer.setName(userInfoDto.getName());
        buyer.setSurname(userInfoDto.getSurname());
        buyer.setBirthday(LocalDate.parse(userInfoDto.getBirthday()).plusDays(1));

        userRepository.save(user);
        buyerRepository.save(buyer);
    }
}
