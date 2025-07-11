// #include <windows.h> // opendir, readdir, closedir
// // #include <dirent.h>
// #include <sys/stat.h> // stat (file info)
// #include <stdio.h>    // printf
// #include <string.h>   // strcpy, strcat
// #include <node_api.h>

// // #define DWORD unsigned long
// // #define HANDLE = void*

// char *my_directory = "C:/Users/Kaleb/Downloads/*";

// struct file
// {
//     char *name;
//     DWORD date_modified;
//     DWORD size;
//     char *type;
// };

// int max_files = 1000; // or however many you expect
// struct file *filelist = malloc(max_files * sizeof(struct file));

// // Check if malloc worked
// if (filelist == NULL)
// {
//     // handle error - out of memory
//     return NULL;
// }

// // cd my_directory
// // filelist = array of file structs

// // for my_file(i) in my_directory
// //     filelist[i] = get_data_from(my_file(i))
// // end
