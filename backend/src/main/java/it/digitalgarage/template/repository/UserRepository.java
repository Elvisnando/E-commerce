package it.digitalgarage.template.repository;

import it.digitalgarage.template.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findUserByConfirmToken(String token);
    User findUserByEmail(String email);
    User findById(Long id);

    List<User> findAll();
}