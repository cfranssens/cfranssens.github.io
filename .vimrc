set nocompatible
filetype on

filetype plugin on
filetype indent on
syntax on

set shiftwidth=4
set nobackup

set nowrap
set number
set incsearch

set ignorecase
set smartcase
set showcmd
set showmode
set hlsearch

set wildmenu

set backspace=indent,eol,start
set mouse=a

command C write! | silent! !tmux send-keys -t 0:0 C-c " clear" C-m " wasm-pack build --target web" C-m
