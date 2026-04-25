package com.realestate.service;

import com.realestate.model.User;
import com.realestate.repository.UserRepository;
import com.realestate.utils.PasswordUtils;

public class UserService {
    private final UserRepository userRepository = new UserRepository();

    public User register(String username, String email, String password, String firstName, String lastName, String phone) {
        if (userRepository.existsByUsername(username)) {
            return null;
        }
        if (userRepository.existsByEmail(email)) {
            return null;
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(PasswordUtils.hash(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhone(phone);
        user.setRole("USER");
        user.setEnabled(true);

        return userRepository.save(user);
    }

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && PasswordUtils.verify(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findById(Long id) {
        return userRepository.findById(id);
    }
}