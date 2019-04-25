package it.digitalgarage.template.entity;

import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pentacoin")
public class CoinAddresses {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "address")
    private String address;

    @Column(name = "pubKey")
    private String pubKey;

    @Column(name = "privKey")
    private String privKey;

    @Column(name = "userID")
    private Long userID;

    @Column(name = "available")
    private Boolean available;
}
