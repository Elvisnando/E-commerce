package it.digitalgarage.template.entity;

import lombok.*;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "isBusiness")
    private boolean isBusiness;

    @Column(name = "isProducer")
    private boolean isProducer;

    @Column(name = "isMerchant")
    private boolean isMerchant;

    @Column(name = "isRestaurant")
    private boolean isRestaurant;

    @Column(name = "isAdmin")
    private boolean isAdmin;

    @Column(name = "isActive")
    private boolean isActive;

    @Column(name = "confirmToken")
    private String confirmToken;

    @Column(name = "inRecovery")
    private  boolean inRecovery;

    @Column(name = "question")
    private int question;

    @Column(name = "answer")
    private String answer;


}
