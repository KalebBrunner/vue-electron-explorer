// my_addon.c
#include <node_api.h>

// Function 1
napi_value GetString(napi_env env, napi_callback_info info) {
    napi_value result;
    napi_create_string_utf8(env, "Hello from C!", NAPI_AUTO_LENGTH, &result);
    return result;
}

// Function 2  
napi_value GetNumber(napi_env env, napi_callback_info info) {
    napi_value result;
    napi_create_int32(env, 42, &result);
    return result;
}

napi_value AddNumbers(napi_env env, napi_callback_info info) {
    napi_status status;
    size_t argc = 2;
    napi_value args[2];

    // Get the arguments
    status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Failed to parse arguments");
        return NULL;
    }

    // Check if we have exactly 2 arguments
    if (argc < 2) {
        napi_throw_error(env, NULL, "Expected exactly 2 arguments");
        return NULL;
    }

    // Convert arguments to numbers
    int32_t num1, num2;
    status = napi_get_value_int32(env, args[0], &num1);
    if (status != napi_ok) {
        napi_throw_error(env, NULL, "First argument must be a number");
        return NULL;
    }

    status = napi_get_value_int32(env, args[1], &num2);
    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Second argument must be a number");
        return NULL;
    }

    // Calculate sum
    int32_t sum = num1 + num2;

    // Create return value
    napi_value result;
    status = napi_create_int32(env, sum, &result);
    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Failed to create return value");
        return NULL;
    }

    return result;
}
// Export all functions
napi_value Init(napi_env env, napi_value exports) {
    napi_value fn1, fn2, fn3;

    napi_create_function(env, NULL, 0, GetString, NULL, &fn1);
    napi_create_function(env, NULL, 0, GetNumber, NULL, &fn2);
    napi_create_function(env, NULL, 0, AddNumbers, NULL, &fn3);

    napi_set_named_property(env, exports, "getString", fn1);
    napi_set_named_property(env, exports, "getNumber", fn2);
    napi_set_named_property(env, exports, "addNumbers", fn3);

    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)