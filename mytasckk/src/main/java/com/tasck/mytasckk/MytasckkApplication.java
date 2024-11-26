package com.tasck.mytasckk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.tasck.mytasckk.Entity")
@EnableJpaRepositories(basePackages = "com.tasck.mytasckk.Repository")
public class MytasckkApplication {

	public static void main(String[] args) {
		SpringApplication.run(MytasckkApplication.class, args);
	}

}
