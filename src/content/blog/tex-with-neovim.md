---
title: Mac과 Neovim으로 TeX 문서 작성하기
pubDate: 2026-01-04T03:45:00+09:00
description: "VimTeX + Skim + LuaSnip 설정 방법"
tags: [Software]
draft: false
---

## 들어가며

처음으로 텍<sup>TeX</sup>을 알게 된 것은 고등학생 때였던 것 같다. 
껐다 켜면 모든 설치가 초기화되는 학교 컴퓨터에서 텍을 사용하기 위해 TeX Live를 USB 저장 장치에
넣어다니기도 했지만, 컴퓨터 앞에서 설명서를 읽고 있을 시간에 알고리즘 문제 풀이, 
또는 주로 웹 서핑을 하느라 정작 잘 사용하지는 못했다.

제대로 텍의 사용법을 배운 것은 학부 과정 2학년 때, 강의의 과제를 제출하기 위해 고군분투하던 때였다.
그때는 맥<sup>Mac</sup>을 쓰지도 않았고 TeXworks로 하나하나 입력하면서 과제를 작성했던 것 같다.
비록 그 때 작성한 과제는 지금은 거의 남아있지 않지만, 그 이후로도 라텍<sup>LaTeX</sup>을 사용하면서
여러 문서를 만들어 보았다.

어느 날은 강의 시간에 텍을 사용하여 만든 강의노트를 공유해주신 고마운 선배를 보고 영감을 받아서
나도 비슷한 짓을 해보았는데, 할 때는 신났지만 지금 돌아보면 아무래도 강의는 너무 빠른데다 
집중도 잘 안되었던 것 같다. 
결국 칠판에 적힌 것을 컴퓨터로 따라가며 더듬더듬 베껴적는 정도 밖에는 되지 않았다.
대학원에 들어가면 당분간은 종이와 펜을 쓸 것 같다.

한편, 그 당시 접한 것이 [이 글](https://castel.dev/post/lecture-notes-1/ "How I'm able to take notes in mathematics lectures using LaTeX and Vim")이었다.
실시간으로 라텍 강의 노트 만들기를 하기 위한 글이지만, 
여기에 영감을 얻어 지금은 Neovim으로 로컬에서 라텍을 사용할 수 있는 환경을 만들게 되었다.

이제는 많은 이공계 사람이 텍을 사용하여 문서를 작성하고 있음을 안다.
또한 내가 아는 수학과의 많은 사람은 아이패드와 맥을 사용하는 것 같았다.
한편, 내가 아는 수학과의 사람 중 Neovim을 좋아하는 사람은 없는 것 같다. 다들 VS Code 등을 사용하지 않을까?

이 글에서는 맥OS<sup>macOS</sup>에서 Neovim으로 텍 문서를 작성하기 위한 환경을 정리해 보았다.
결과적으로 cwlo2F는 현재 VimTeX + Skim + LuaSnip을 사용하고 있다.

1. VimTeX는 .tex 파일을 Neovim 편집기에서 예쁘게 보여주고, 컴파일 등 다양한 도구를 제공한다.
2. Skim은 pdf 문서 뷰어이다.
3. LuaSnip은 Neovim에서 스니펫 기능 -- 자동으로 코드를 확장하는 기능을 사용할 수 있게 한다. 

이번 글은 터미널 환경에서 명령어를 실행하거나 텍스트 편집을 하는 것에 어느 정도 익숙한 사람을 대상으로 한다. 이후 cwlo2F가 사용하는 환경에 관한 추가적인 포스트를 작성할 예정이다.

## 빠른 시작
1. 다음 명령을 통해 Neovim, Skim을 설치한다. 
```bash
brew install neovim
brew install --cask skim
# 텍이 없다면 MacTeX 설치 후 latexmk가 잡히는지 확인
which latexmk
```
2. cwlo2F가 사용하는 설정 [dotfiles](https://github.com/cwlo2F/dotfiles)을 설치하고,
`LuaSnip/` 아래에 [cwlo2F/tex-snippets](https://github.com/cwlo2F/tex-snippets) 파일을 가져온다.
3. `nvim document.tex`으로 테스트한다. VimTeX에서 `\ll`은 컴파일, `\lv`는 Skim으로 PDF 열기이다.
4. (선택) PDF에서 역방향 검색을 하려면, Skim → Preferences → Sync에서 Preset: Custom으로 맞추고, Command: `/opt/homebrew/bin/nvim`, Arguments: `--headless -c "VimtexInverseSearch %line '%file'"`으로 설정한다. PDF에서 ⌘+⇧+클릭하면 소스로 이동한다.

## 왜 이런 짓을?

Overleaf도 있고, VS Code도 있는데 굳이 Neovim을? 그렇게 생각할 수도 있겠다.
몇 가지 변명을 달아 본다.

### 인터넷 필요 없음

Overleaf로 작업하면 가끔씩 들려오는 "서버가 터졌다"는 소식에 불안할 것이다.
그런 것에 의존하다가는 언젠가 작업을 할 수 없는 때가 올지도 모르는 것이다.

한편, 로컬에 환경을 만들어 놓으면 견고한 안정성을 갖출 수 있다.
Overleaf를 쓰고 있었다면, 이번 기회에 비행기에서도, 산 속에서도, 무인도에서도 텍질을 할 수 있는 환경을 하나 장만해보는 것이 어떨까?

### 이 정도도 괜찮다

파일을 변경할 때마다 내용을 컴파일하여 볼 수 있다.
스니펫을 통해 수식 작성이 비약적으로 빨라진다.
이 정도면 텍질을 하기에 충분하다.

### 취향: 터미널이 멋있으니까

VS Code 또한 설정을 통해 스니펫과 자동 완성, 자동 연속 컴파일을 힘들이지 않고 사용할 수 있을 것이다.

그렇지만.
Neovim 같은 것이 취향이라면. 키보드에서 손을 떼는 것이 귀찮게 느껴진다면.
왠지 멋진 일을 하는 것처럼 보이고 싶다면.
터미널에서 Neovim으로 작업해보면 또 다른 느낌이 들지도 모른다.

## Homebrew 설치

[Homebrew](https://brew.sh/ko/)는 맥에서 소프트웨어를 설치하고 관리할 수 있는 도구이다. Neovim과 Skim을 설치하려면 Homebrew를 사용하는 것이 좋다. 이미 설치되어 있는지는 `which brew`로 확인할 수 있다. 이를 실행했을 때 아무 것도 안 나오면 설치되어 있지 않은 것이다.

다음 명령어를 실행하여 Homebrew를 설치할 수 있다.
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Skim 설치

[Skim](https://skim-app.sourceforge.io/)은 맥에서 사용할 수 있는 오픈 소스 PDF 리더이다.
특별한 기능이 있는 것은 아니지만, VimTeX과의 연동성이 좋다.
cwlo2F는 Skim을 PDF를 여는 기본 프로그램으로 설정하여 사용하고 있다.
다음 명령어로 설치한다.
```bash
brew install --cask skim
```
Command + Space를 눌러서 Skim을 입력했을 때 프로그램이 나타난다면 설치가 완료된 것이다.

## Neovim 설치와 설정

[Neovim](https://neovim.io/)은 빔<sup>Vim</sup>을 개선한 터미널 기반 텍스트 편집기이다.
플러그인을 통해 기능을 확장할 수 있다.

### 설치

다음 명령어를 통해 Homebrew로 Neovim을 설치할 수 있다.
```bash
brew install neovim
```

이후 `nvim` 명령어로 Neovim을 실행할 수 있다. 설치를 확인하기 위해 `nvim` 또는 `nvim --version`을 실행해 볼 수 있다.

### Neovim 사용법 기초

- **가장 중요**: `:q`으로 종료한다.
- 명령 모드에서 `hjkl`으로 텍스트를 이동할 수 있다.
- `i`로 입력 모드로 들어간다. `<ESC>`로 명령 모드로 돌아간다.
- `:w`으로 변경사항을 저장한다.

이 외에도 아주 많은 단축키와 기능이 있다.
처음부터 많이 공부하기보다는 사용해보다가 궁금한 것이 생길 때마다 새로 공부하는 것이 좋다.
`vimtutor`를 실행하면 빔 길잡이<sup>VIM Tutor</sup>가 실행되는데, 이를 통해 기초적인 빔 사용법을 익힐 수 있다.

### 설정

Neovim의 설정 파일은 `~/.config/nvim/init.lua`에 위치한다.
cwlo2F가 사용하는 설정은 [dotfiles](https://github.com/cwlo2F/dotfiles)에서 볼 수 있는데,
이 글에서는 Neovim을 설정하는 방법을 짧게 설명한다.

터미널에서 `cd ~/.config/nvim/`을 실행한 다음, `ls`를 실행하여 보자.

#### 파일 구조

``` txt
~/.config/nvim/
├── init.lua            # 진입점
├── lua/
│   ├── mappings.lua    # 명령어 키 매핑
│   ├── plugins.lua     # VimTeX, LuaSnip 
│   ├── settings.lua    # 기본 설정
│   └── tex_utils.lua   # 스니펫 조건 함수
├── LuaSnip/
│   ├── all.lua         # 모든 파일 형식 스니펫
│   └── tex/            # .tex 스니펫
│       └── math.lua    # 수학 스니펫
└── plugin/
    └── tex.lua         # VimTeX 설정
```

이 중 Neovim을 사용하고 플러그인을 설치하기 위한 파일인 `init.lua`, `lua/plugins.lua`, `lua/settings.lua`에 다음과 같은 내용을 써 넣는다.
언젠가는 여기에서 설명하는 것보다 더 많은 설정을 하게 될지도 모르지만, 지금은 동작만 하는 정도이면 좋을 것이다.

나머지  `lua/mappings.lua`, `lua/tex_utils.lua`, `LuaSnip/`, `plugin/tex.lua` 설정에 관해서는 다음 절에서 설명할 것이다.

#### `init.lua`
위에서도 설명했지만, `nvim init.lua`를 실행하면 Neovim으로 `init.lua`를 편집할 수 있다.
`init.lua`에 다음과 같은 내용을 써 넣고 (아마 ⌘+C, ⌘+V로 복사하고 붙여넣을 수 있을 것이다) 명령 모드에서 `:wq`을 눌러 저장하고 종료한다.
```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if vim.fn.empty(vim.fn.glob(lazypath)) > 0 then
  vim.fn.system({
    "git", "clone", "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git", lazypath
  })
end
vim.opt.rtp:prepend(lazypath)


-- Load plugins.
-- The list of plugins are in `lua/plugins.lua`.
require("lazy").setup(require("plugins"))

require('settings')
require('mappings')
```
이렇게 하면 플러그인 관리자 lazy.nvim으로 플러그인을 관리할 수 있다.
나머지 설정은 `lua/settings.lua`로 분리하면 된다.

#### `lua/plugins.lua`
사용하고 싶은 플러그인을 여기에 추가한다.
가장 위쪽에 lazy.nvim을 넣어 놓으면 자기 자신을 관리하도록 할 수 있으니 넣는다.
이외에는 VimTeX, LuaSnip을 추가한다.
```lua
return {
  -- lazy.nvim
  { "folke/lazy.nvim", version = "*"},

  -- VimTeX
  "lervag/vimtex",

  -- LuaSnip
  {
    "L3MON4D3/LuaSnip",
    version = "v2.*",
    build   = "make install_jsregexp",
    config  = function()
      require("luasnip.loaders.from_lua").lazy_load {
        paths = vim.fn.stdpath("config") .. "/LuaSnip"
      }
    end,
  },
}
```

#### `lua/settings.lua`
여기에 기타 Neovim 설정을 넣는다.
예를 들어 `vim.opt.number = true`를 넣으면 왼쪽에 줄 번호가 나타난다.
여기에는 어떤 취향이 있을지도 모른다고 생각하여, LuaSnip을 이용하기 위한 설정만을 여기에 남긴다.
```lua
-- 여기에 다른 설정을 입력

require("luasnip").config.set_config({ -- Setting LuaSnip config

  -- Enable autotriggered snippets
  enable_autosnippets = true,

  -- Use Tab to trigger visual selelection
  store_selection_keys = "<Tab>",
})

-- Reload LuaSnip keymap
vim.keymap.set("n", "<Leader>L",
  function() require("luasnip.loaders.from_lua").load({paths = "~/.config/nvim/LuaSnip/"}) end,
  { noremap = true })
```

## VimTeX 설정

VimTeX은 Neovim에서 텍 문서를 편집할 때 필요한 기능을 제공하는 플러그인이다.
주된 기능은 다음과 같다.
- 문법 하이라이트
- 자동 컴파일
- PDF 뷰어 연동
- 수식 영역 감지

### 텍 설치하기
텍이 설치되어 있지 않다면 설치해야 한다.
보통 순정 텍보다는 라텍을 많이 사용하므로, `which latexmk`를 통해 설치되어 있는지 확인할 수 있을 것이다.

맥에서는 [맥텍<sup>MacTeX</sup>](https://www.tug.org/mactex/)을 설치하면 된다.

### `plugin/tex.lua` 설정

```lua
vim.g.tex_flavor = 'latex'
vim.g.tex_conceal = 'abdmg'

vim.g.vimtex_view_method = 'skim'
vim.g.vimtex_view_skim_sync = 1
vim.g.vimtex_view_skim_activate = 1
vim.g.vimtex_quickfix_mode = 0

vim.g.vimtex_compiler_method = 'latexmk'
vim.g.vimtex_compiler_latexmk = {
  options = {
    "-pdf",
    "-interaction=nonstopmode",
    "-synctex=1",
  },
}
```
뷰어를 Skim으로 설정한다. sync를 통해 정방향 검색 -- 컴파일 하였을 때 소스에서 해당하는 PDF의 위치로 이동하는 기능을 활성화할 수 있다.

### (선택) 역방향 검색 설정
PDF에서 원하는 부분을 ⌘+⇧+클릭하면 소스에서 해당하는 위치로 커서가 이동하는 "역방향 검색" 기능을 사용할 수 있다.
위쪽 네비게이션 바 왼쪽에서 Skim → Preferences을 선택하거나, Skim 창에서 `⌘,`를 입력하면 설정 창이 나타난다. 설정 창의 Sync에서, Preset: Custom을 선택한다. 아래에 있는 칸에 다음을 붙여넣는다.
- Command: `/opt/homebrew/bin/nvim`
- Arguments: `--headless -c "VimtexInverseSearch %line '%file'"`

맥OS에서 Skim은 터미널과 다른 PATH로 실행될 수 있으므로,
`nvim` 대신 `/opt/homebrew/bin/nvim`처럼 절대경로를 권장한다.

### 자주 쓰는 VimTeX 명령어
- `\ll`: 컴파일 토글
- `\lv`: PDF 보기
- `\lc`: 임시 파일 정리
- `\le`: 에러 확인

## LuaSnip 설정

LuaSnip은 스니펫 엔진이다. 짧은 트리거를 입력하면 긴 라텍 명령어로 확장된다.

### `lua/mappings.lua` 설정

여기에 LuaSnip을 위한 명령어 키를 설정한다.
```lua
local ls = require("luasnip")

vim.keymap.set('i', '<Tab>', function()
  if ls.expandable() then return "<Plug>luasnip-expand-snippet" else return "<Tab>" end end,
  { noremap = false, expr = true, silent = true })

-- Jump forward in through tabstops in insert and visual mode with Control-f
vim.keymap.set({'i', 's'}, '<C-F>',
  function() ls.jump(1)  end,
  { silent = true })

-- Use Shift-Tab to jump backwards through snippets
vim.keymap.set({'i', 's'}, '<S-Tab>',
  function() ls.jump(-1) end,
  { silent = true })
```
위와 같이 설정하면 `<Tab>`으로 스니펫 확장,
`<Ctrl>+F`으로 앞으로 건너뛰기, `<Shift>+<Tab>`으로 뒤로 건너뛰기가 된다.
앞으로 건너뛰기는, 예컨대 분수 스니펫 `\frac{<1>}{<2>}<0>`을 확장하였을 때 처음 위치는 `<1>`이 되는데, 한 번 건너뛰면 `<2>`로 이동하고, 그 다음 건너뛰면 `<0>`으로 이동하는 기능이다.

### `lua/tex_utils.lua` 설정
```lua
local tex_utils = {}

-- math context detection
tex_utils.in_mathzone = function()
  return vim.fn['vimtex#syntax#in_mathzone']() == 1
end

tex_utils.in_text = function()
  return not tex_utils.in_mathzone()
end

-- comment detection
tex_utils.in_comment = function()
  return vim.fn['vimtex#syntax#in_comment']() == 1
end

tex_utils.in_env = function(name)
  local is_inside = vim.fn['vimtex#env#is_inside'](name)
  return (is_inside[1] > 0 and is_inside[2] > 0)
end

-- itemize environment detection
tex_utils.in_itemize = function()
  return tex_utils.in_env('itemize')
end

return tex_utils
```
cwlo2F의 스니펫을 가져다 쓰고 싶으면 이 설정도 같이 가져가야 한다.

### 스니펫 파일 위치

스니펫 파일은 `LuaSnip/` 아래에 저장된다. `LuaSnip/tex.lua`에서는 `.tex` 파일에서만
동작하는 스니펫을 설정할 수 있다. 또는, `LuaSnip/tex/math.lua`에 설정하여도 된다.
이러면 `LuaSnip/tex/` 아래에 여러 파일을 두고 스니펫을 관리할 수 있다.

## 실전 수학 스니펫

이 절에서는 cwlo2F가 유용하게 사용하는 스니펫을 정리해 보았다.
[cwlo2F/tex-snippets](https://github.com/cwlo2F/tex-snippets)에
있는 파일들을 `LuaSnip/tex/` 아래에 넣으면 cwlo2F가 사용하는 텍 스니펫을 사용할 수 있다.

### 기본 수식 진입

- `mk` → `\( \)`: inline math 진입
- `dm` → `\[ \]`: display math 진입

### 분수와 지수

- `//` → `\frac{}{}`
- `^^` → `^{}`
- `__` → `_{}`
- `sr` → `^{2}`

### 자주 쓰는 기호

- `->` → `\to`
- `inn` → `\in`
- `xx` → `\times`
- `ZZ` → `\mathbb{Z}`

### 그리스 문자
그리스어 키보드를 참고하여 설정해 보았다.
`;` 이후 입력을 통해 수식 모드에서 그리스 문자를 입력할 수 있다.
대문자는 대문자로 입력하면 되고, 변형의 경우 앞에 `v`를 붙인다.
- `;a` → `\alpha`
- `;b` → `\beta`
- `;G` → `\Gamma`
- `;q` → `\theta`
- `;f` → `\phi`
- `;vf` → `\varphi`

### 큰 연산자
- `dint` → `\int_{}^{}`
- `dsum` → `\sum_{}^{}`

## 워크플로우

실제로 문서를 작성하는 과정은 다음과 같다.
1. 파일 열기: `nvim document.tex`
2. 컴파일 시작: 기본적인 문서의 틀을 작성했다면, `\ll`으로 연속 컴파일을 시작한다.
3. 스니펫으로 빠르게 작성
4. `:w`으로 저장하며 변경 사항 확인

## 나가며

이상으로 cwlo2F가 Neovim으로 텍 문서를 작성하는 환경을 소개해 보았다.
하지만 여기까지는 동작하는 최소 세팅일 뿐이다. Neovim의 세계는 아주 넓으므로, 본인에게 맞는 Neovim 환경을 설정해 보는 것도 좋을 것이다.
키보드만으로 작업하는 것에 대한 동경을 품고 있다면 한 번 쯤은 시도해 보는 것이 어떨까?

## 여담

- 원래는 zathura를 사용해 터미널 한 칸에서 모든 작업을 처리해보고 싶었는데,
몇 번 시도하여도 zathura를 설치하고 사용할 수가 없었다. Skim으로도 만족스럽기는 한데,
터미널에 전부 들어가 있으면 멋있다고 생각한다.
- 처음에는 UltiSnips를 스니펫 엔진으로 사용하였는데, lua가 더 좋아 보여서 LuaSnip으로 바꾸게 되었다. 취향에 맞게 사용하면 될 것이다.
- 이 환경에 너무 정착해서 그런지, 나는 오히려 Overleaf를 시도한 적이 거의 없고, 아마 적응하지
못 할지도 모르겠다.

## 참고 자료

- [Castel 블로그 글](https://castel.dev/post/lecture-notes-1/)
- [ejmastnak 블로그 글](https://ejmastnak.com/tutorials/vim-latex/luasnip/)
- [LuaSnip 문서](https://github.com/L3MON4D3/LuaSnip/blob/master/DOC.md)