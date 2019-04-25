package it.digitalgarage.template.dto;


import lombok.*;

import java.math.BigInteger;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductToAddInCartDto {

    private Long IdProduct;

    private BigInteger quantity;

}
