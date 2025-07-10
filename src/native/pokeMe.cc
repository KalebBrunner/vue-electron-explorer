#include <node_api.h>

napi_value PokeMe(napi_env env, napi_callback_info info)
{
    size_t argcount = 1;
    napi_value arglist[1];
    napi_get_cb_info(env, info, &argcount, arglist, NULL, NULL);

    int32_t dmg;
    napi_get_value_int32(env, arglist[0], &dmg);

    // Add the logic
    napi_value result;
    if (dmg < 400)
    {
        napi_create_string_utf8(env, "owch", NAPI_AUTO_LENGTH, &result);
    }
    else if (dmg < 1000)
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
    napi_create_function(env, NULL, 0, PokeMe, NULL, &fn);
    napi_set_named_property(env, exports, "pokepoke", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
