package com.lostfound.backend.exception_handling;

import lombok.NoArgsConstructor;

// Recommended to throw when a row is unable to be found in a table (Example: through findBy queries)
@NoArgsConstructor
public class EntryNotFoundException extends RuntimeException {
    String item, field, fieldName;
    Long fieldId;

    // Example: "Post not found with name: Jason"
    public EntryNotFoundException(String item, String field, String fieldName) {
        super(item + " not found with " + field + "-> " + fieldName);
        this.item = item;
        this.field = field;
        this.fieldName = fieldName;
    }

    // Example: "Post not found with postID: 5"
    public EntryNotFoundException(String item, String field, Long fieldId) {
        super(item + " not found with " + field + "-> " + fieldId);
        this.item = item;
        this.field = field;
        this.fieldId = fieldId;
    }
}

