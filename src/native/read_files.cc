#include <windows.h> // opendir, readdir, closedir
// #include <dirent.h>
#include <sys/stat.h> // stat (file info)
#include <stdio.h>    // printf
#include <string.h>   // strcpy, strcat
#include <node_api.h>

#define NAPI_CALL(env, call)                                              \
    do                                                                    \
    {                                                                     \
        napi_status status = (call);                                      \
        if (status != napi_ok)                                            \
        {                                                                 \
            const napi_extended_error_info *error_info = NULL;            \
            napi_get_last_error_info((env), &error_info);                 \
            bool is_pending;                                              \
            napi_is_exception_pending((env), &is_pending);                \
            if (!is_pending)                                              \
            {                                                             \
                const char *message = (error_info->error_message == NULL) \
                                          ? "empty error message"         \
                                          : error_info->error_message;    \
                napi_throw_error((env), NULL, message);                   \
                return NULL;                                              \
            }                                                             \
        }                                                                 \
    } while (0)

// #define DWORD unsigned long
// #define HANDLE = void*

// cd my_directory
// filelist = array of file structs

// for my_file(i) in my_directory
//     filelist[i] = get_data_from(my_file(i))
// end


// char* my_directory = "C:/Users/Kaleb/Downloads/*";

struct file
{
    char* name;
    DWORD date_modified;
    DWORD size;
    char* type;
};
typedef struct file file_t;


int count_files(char* mydir) {
    int max_files = 1000;
    int max_file_size = max_files * sizeof(struct file);
    file_t* filelist = (struct file*)malloc(max_file_size);

    if (filelist == NULL) {
        printf("Debug: Found %d files\n", max_files);
        return NULL;
    }

    return  max_file_size;
}

int pseudo_count_files(char* mydir) {
    return 5;
}

napi_value read_files(napi_env env, napi_callback_info info) {
#define EXPECTED_ARGUMENT_COUNT 2
    size_t argc = EXPECTED_ARGUMENT_COUNT;
    napi_value args[EXPECTED_ARGUMENT_COUNT];
    NAPI_CALL(env, napi_get_cb_info(env, info, &argc, args, NULL, NULL));


    size_t path_length;
    NAPI_CALL(env, napi_get_value_string_utf8(env, args[0], NULL, 0, &path_length));

    char* path = (char*)malloc(path_length + 1);
    if (path == NULL) {
        return NULL;  // Handle malloc failure
    }
    NAPI_CALL(env, napi_get_value_string_utf8(env, args[0], path, path_length + 1, NULL));


    int64_t file_count = pseudo_count_files(path);
    napi_value output;
    NAPI_CALL(env, napi_create_double(env, file_count, &output));

    free(path);
    return output;
}


napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;
    napi_create_function(env, NULL, 0, read_files, NULL, &fn);
    napi_set_named_property(env, exports, "run", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)


