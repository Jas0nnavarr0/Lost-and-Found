package com.lostfound.backend.auth.custom_user_details;

import com.lostfound.backend.model.User;
import com.lostfound.backend.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    //get the authotiries and provide authentication
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        User foundUser = userRepository.findByUsername(name).orElseThrow(() -> new UsernameNotFoundException("No user found with name: " + name));

        return UserDetailsImpl.build(foundUser);
    }
}
