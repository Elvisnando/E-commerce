package it.digitalgarage.template.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "paymentInfo")
public class PaymentInfo {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "userId")
    private Long userId;

    @Column(name = "cardOwner")
    private String cardOwner;

    @Column(name = "cardNumber")
    private String cardNumber;

    @Column(name = "productionDate")
    private LocalDate expiryDate;

    @Column(name = "cvv")
    private String cvv;

    @Column(name = "address")
    private String address;
}
