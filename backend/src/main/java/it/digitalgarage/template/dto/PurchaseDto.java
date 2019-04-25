package it.digitalgarage.template.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseDto {

    private Long id;

    private Long userId;

    private Long productId;

    private int quantity;

    private LocalDate purchaseDate;
}
