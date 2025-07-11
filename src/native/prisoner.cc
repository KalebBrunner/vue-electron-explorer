#include <node_api.h>

napi_value prisoner(napi_env env, napi_callback_info info)
{
    size_t arg_count = 1;
    napi_value arg_list[1];
    napi_get_cb_info(env, info, &arg_count, arg_list, NULL, NULL);

    int32_t damage;
    napi_get_value_int32(env, arg_list[0], &damage);

    // Add the logic
    napi_value result;
    if (damage < 5)
    {
        napi_create_string_utf8(env, "owch", NAPI_AUTO_LENGTH, &result);
    }
    else if (damage < 10)
    {
        napi_create_string_utf8(env, "AAAH!", NAPI_AUTO_LENGTH, &result);
    }
    else
    {
        napi_create_string_utf8(env, "AaAaAaA!", NAPI_AUTO_LENGTH, &result);
    }

    return result;
}

napi_value Init(napi_env env, napi_value exports)
{
    napi_value fn;
    napi_create_function(env, NULL, 0, prisoner, NULL, &fn);
    napi_set_named_property(env, exports, "poke", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
