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

// napi_value pseudo_count_files(napi_env env, napi_callback_info info) {

//     int value = 5;
//     napi_value output;
//     NAPI_CALL(env, napi_create_double(env, value, &output));
//     return output;
// }


#define EXPECTED_ARGUMENT_COUNT 1

napi_value read_files(napi_env env, napi_callback_info info) {
    napi_status status_alarm;

    // Collect arguments from node
    napi_value argument_list[EXPECTED_ARGUMENT_COUNT];
    size_t argument_count = EXPECTED_ARGUMENT_COUNT;
    status_alarm = napi_get_cb_info(env, info, &argument_count, argument_list, NULL, NULL);
    if (status_alarm != napi_ok) {
        (void)napi_throw_error(env, NULL, "Failed to parse arguments");
        return NULL;
    }

    // Get length of string
    size_t string_length;
    status_alarm = napi_get_value_string_utf8(env, argument_list[0], NULL, 0, &string_length);
    if (status_alarm != napi_ok) {
        (void)napi_throw_error(env, NULL, "Failed to get string length");
        return NULL;
    }
    (void)fprintf(stderr, "Path length: %ld\n", string_length);

    // Create array for string
    char* string_buffer = (char*)malloc(string_length + 1);
    if (string_buffer == NULL) {
        (void)napi_throw_error(env, NULL, "Malloc failure");
        return NULL;
    }

    // Fill the array
    status_alarm = napi_get_value_string_utf8(env, argument_list[0], string_buffer, string_length + 1, &string_length);
    if (status_alarm != napi_ok) {
        (void)napi_throw_error(env, NULL, "Failed to write string");
        return NULL;
    }
    (void)fprintf(stderr, "Path to investigate: %s\n", string_buffer);





    // int64_t file_count = count_files(path);
    napi_value output;
    NAPI_CALL(env, napi_create_double(env, 5, &output));

    free(string_buffer);

    return output;
}


napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;
    napi_create_function(env, NULL, 0, read_files, NULL, &fn);
    napi_set_named_property(env, exports, "run", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)


