package it.digitalgarage.template.dto;

import it.digitalgarage.template.entity.Product;
import lombok.*;

import java.math.BigInteger;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemsDto {

    private Long id;

    private Long userId;

    private Long productId;

    private ProductDto product;

    private BigInteger quantity;
}
