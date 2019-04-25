package it.digitalgarage.template.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentInfoDto {

    private Long id;

    private Long userId;

    private String cardOwner;

    private String cardNumber;

    private String expiryDate;

    private String cvv;

    private String address;
}
