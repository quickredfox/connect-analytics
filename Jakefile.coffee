# require Node's filesystem methods
fs = require 'fs'
# require Node's child process creation methods
spawn = require( 'child_process' ).spawn


log = console.log  
        
namespace 'coffee', ()->

    desc 'Watches files in src and compiles them in lib'
    task 'watch', [], ()-> 
        # spawns a process that executes the command line: coffee -w -b -o ./lib -c ./src
        # so that we can type "jake coffee:watch" and not have to remember coffee's arguments
        cof  = spawn 'coffee', ['-w', '-b', '-o', './lib', '-c', './src'], customFds: [0..5]
   
    desc 'Compiles files in src to lib'
    task 'compile', [], ()-> 
        # spawns a process that executes the command line: coffee -b -o ./lib -c ./src
        # so that we can type "jake coffee:compile" and not have to remember coffee's arguments
        # can be used by git hooks
        message = "\nSuccess: compiled coffeescript!\n"
        trace = ''
        try
            cof = spawn 'coffee', ['-b', '-o', './lib', '-c', './src'], customFds: [0..5]
        catch E
            message = "\nFailure: failed to compile coffeescript!\n"
            trace   = E
        log message
        log trace
