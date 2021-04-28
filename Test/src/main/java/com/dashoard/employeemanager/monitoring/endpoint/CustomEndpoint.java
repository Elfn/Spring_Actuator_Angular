package com.dashoard.employeemanager.monitoring.endpoint;

import org.springframework.boot.actuate.endpoint.annotation.Endpoint;
import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Endpoint(id = "custom")
@Component
public class CustomEndpoint {

    @ReadOperation
    public Map<String, String> customEndPoint(String username){
        Map<String,String> map = new HashMap<>();
        map.put("Key","Value");
        map.put("username",username);
        return map;
    }

}
