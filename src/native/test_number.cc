#include <node_api.h>

napi_value TestNumber(napi_env env, napi_callback_info info) {
    napi_value result;
    napi_create_double(env, 100.0, &result);
    return result;
}

napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;
    napi_create_function(env, NULL, 0, TestNumber, NULL, &fn);
    napi_set_named_property(env, exports, "getNumber", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)