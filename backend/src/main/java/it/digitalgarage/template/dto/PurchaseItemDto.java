package it.digitalgarage.template.dto;

import it.digitalgarage.template.entity.Product;
import lombok.*;

import java.math.BigInteger;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseItemDto {

    private Long id;

    private String userId;

    private Long productId;

    private Product product;

    private BigInteger quantity;
}
