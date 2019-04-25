package it.digitalgarage.template.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class SmtpMailSender {

    @Autowired
    private JavaMailSender javaMailSender;


    public void sendConfirm(String name, String to, String confirmToken) throws MessagingException {
        String subject = "Confirm your account at PENTABIT.com";
        String header = "<h1 style=\"font-size: 60px;\">Welcome to Pentabit.com</h1>\n";

        String body = String.join("", "<p style=\"font-size: 20px;\" >Congratulations ", name, ". You have successfully completed the registration to our platform Pentabit.com. ",
                "<br>To verify your account please click the link below<br>",
                "<br>Verify your account by clicking below<br></p>");

        String link = String.join("", "http://localhost:3000/register/", confirmToken);

        String button = "<a href=" + link + " style=\"font-size: 30px;\">Verify your account</a>";
        String footer = "<p style=\"font-size: 10px;\">Thanks for registering to our platform";
        String email = header + body + button + footer;
        send(subject, to, email);
    }

    public void sendRecovery(String name, String to, String confirmToken) throws MessagingException {
        String subject = "Recovery password";
        String header = "<h1 style=\"font-size: 60px;\">Pentabit.com</h1>\n";

        String body = String.join("", "<p style=\"font-size: 20px;\" >Hi ", name, ". This email has been automatically generated because you requested a password recovery",
                "<br>To reset your password please click the link below<br>");

        String link = String.join("", "http://localhost:3000/reset_password/", confirmToken);

        String button = "<a href=" + link + " style=\"font-size: 30px;\">Reset your password</a>";
        String footer = "<p style=\"font-size: 10px;\">Thanks for registering to our platform";
        String email = header + body + button + footer;
        send(subject, to, email);
    }

    public void send(String subject, String to, String email) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;
        helper = new MimeMessageHelper(message, true);
        // Multipart messages.
        helper.setSubject(subject);
        helper.setTo(to);
        helper.setText(email, true);
        javaMailSender.send(message);
    }
}


