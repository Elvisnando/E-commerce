package it.digitalgarage.template.service;


import it.digitalgarage.template.dto.ForgetPasswordDto;
import it.digitalgarage.template.dto.ResetPasswordDto;
import it.digitalgarage.template.entity.Buyer;
import it.digitalgarage.template.entity.User;
import it.digitalgarage.template.repository.BuyerRepository;
import it.digitalgarage.template.repository.UserRepository;
import it.digitalgarage.template.util.exception.UserNeverRequestRecoveryException;
import it.digitalgarage.template.util.exception.UserNotFoundByEmailException;
import it.digitalgarage.template.util.exception.WrongUserAnswerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;

@Service
@Transactional
public class ForgetPasswordService {

    @Autowired
    private SmtpMailSender mailSender;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BuyerRepository buyerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //sending email for password forgotten
    public void sendingEmail (ForgetPasswordDto forgetPasswordDto) throws MessagingException, UserNotFoundByEmailException, WrongUserAnswerException {
        System.out.println("Sending email for password forgotten");

        if(forgetPasswordDto == null){
            throw new MessagingException();
        }

        User user = userRepository.findUserByEmail(forgetPasswordDto.getEmail());
        if (user == null) throw new UserNotFoundByEmailException();

        user.setInRecovery(true);
        userRepository.save(user);

        if (!forgetPasswordDto.getAnswer().equalsIgnoreCase(user.getAnswer())) throw new WrongUserAnswerException();

        String token = user.getConfirmToken();
        String to = forgetPasswordDto.getEmail();
        mailSender.sendRecovery(user.getName(), to, token);
    }

    public void resetPassword (ResetPasswordDto resetPasswordDto) throws UserNotFoundByEmailException, UserNeverRequestRecoveryException {

        User user = userRepository.findUserByConfirmToken(resetPasswordDto.getToken());

        if (user == null) throw new UserNotFoundByEmailException();

        if (!user.isInRecovery()) throw new UserNeverRequestRecoveryException();



        user.setPassword(passwordEncoder.encode(resetPasswordDto.getPassword()));
        user.setInRecovery(false);
        userRepository.save(user);
    }
}
