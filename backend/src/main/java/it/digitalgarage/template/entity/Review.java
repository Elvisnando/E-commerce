package it.digitalgarage.template.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "review")
public class Review{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "reviewerId")
    private Long reviewerId;

    @Column(name = "reviewedId")
    private Long reviewedId;

    @Column(name = "writtenDate")
    private LocalDate writtenDate;

    @Column(name = "content")
    private String content;
}
