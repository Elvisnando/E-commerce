package it.digitalgarage.template.entity;


import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "sellerId")
    private Long sellerId;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "category")
    private String category;

    @Column(name = "productionDate")
    private LocalDate productionDate;

    @Column(name = "availability")
    private BigInteger availability;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "region")
    private String region;

}