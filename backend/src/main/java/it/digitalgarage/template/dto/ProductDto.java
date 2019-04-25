package it.digitalgarage.template.dto;

import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.UUID;
import java.math.BigInteger;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Long id;

    private Long sellerId;

    private String name;

    private String description;

    private String category;

    private String productionDate;

    private BigInteger availability;

    private BigDecimal price;

    private String region;



}
