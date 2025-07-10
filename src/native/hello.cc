#include <node_api.h>

napi_value SayHello(napi_env env, napi_callback_info info)
{
    napi_value result;
    napi_create_string_utf8(env, "Hello, native world!", NAPI_AUTO_LENGTH, &result);
    return result;
}

napi_value Init(napi_env env, napi_value exports)
{
    napi_value fn;
    napi_create_function(env, NULL, 0, SayHello, NULL, &fn);
    napi_set_named_property(env, exports, "value", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)