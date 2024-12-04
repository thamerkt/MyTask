package com.tasck.mytasckk.Repository;



import com.tasck.mytasckk.Entity.user;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface userRepository extends JpaRepository<user, Integer> {
    Optional<user> findByEmail(String email);

    Optional<user> findByVerificationToken(String token);
}
