package it.digitalgarage.template.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import it.digitalgarage.template.dto.LoginResponseDto;
import it.digitalgarage.template.dto.UserDto;
import it.digitalgarage.template.entity.Buyer;
import it.digitalgarage.template.entity.User;
import it.digitalgarage.template.repository.*;
import it.digitalgarage.template.util.exception.UserNotActiveException;
import it.digitalgarage.template.util.exception.WrongCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;


@Service
@Transactional
public class AuthenticationService {

    @Value("${security.jwt.secret-key}")
    private String secretKey;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private BuyerRepository buyerRepository;
    @Autowired
    private MerchantRepository merchantRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private ProducerRepository producerRepository;

    //verifying user email
    public LoginResponseDto verifying(UserDto userDto) throws WrongCredentialsException, UserNotActiveException {

        System.out.println("verifing user for login");
        User user = userRepository.findUserByEmail(userDto.getEmail());
        if(user == null) {
            throw new WrongCredentialsException();
        }
        if (!user.isActive()) {
            throw new UserNotActiveException();
        }

        String token = settingToken(userDto.getPassword(), user);
        return LoginResponseDto.builder().token(token).build();
    }

    //verifying user password and if true set the token
    public String settingToken(String passwordInserted, User userInDB) throws WrongCredentialsException {

        String token = "";

        System.out.println(passwordEncoder.matches(passwordInserted, userInDB.getPassword()));
        if (!passwordEncoder.matches(passwordInserted, userInDB.getPassword())) {
            throw new WrongCredentialsException();
        }

        token = Jwts.builder()
                .setSubject(userInDB.getId().toString())
                //.claim("role", "USER")
                .claim("id", userInDB.getId())
                .claim("name", userInDB.getName())
                .claim("email", userInDB.getEmail())
                .claim("isBusiness", userInDB.isBusiness())
                .claim("isMerchant", userInDB.isMerchant())
                .claim("isRestaurant", userInDB.isRestaurant())
                .claim("isProducer", userInDB.isProducer())
                .claim("isAdmin", userInDB.isAdmin())
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();

        return token;
    }}