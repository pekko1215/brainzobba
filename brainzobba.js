function Brainzobba() {


    var pointer = 0;  // ポインタ。メモリのインデックス
    var memory = []; // メモリに見せかけた単なる配列

    var braces = []; // 括弧の対応
    var brace_stack = []; // 括弧の対応チェック用

    var chars   = [
        '<NUL>','<SOH>','<STX>','<ETX>','<EOT>','<ENQ>','<ACK>','<BEL>',
        '<BS>' ,'<HT>' ,'<LF>' ,'<VT>' ,'<NP>' ,'<CR>' ,'<SO>' ,'<SI>' ,
        '<DLE>','<DC1>','<DC2>','<DC3>','<DC4>','<NAK>','<SYN>','<ETB>',
        '<CAN>','<EM>' ,'<SUB>','<ESC>','<FS>' ,'<GS>' ,'<RS>' ,'<US>' ,
        ' ', '!', '"', '#', '$', '%', '&', '\'',
        '(', ')', '*', '+', ',', '-', '.', '/',
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', ':', ';', '<', '=', '>', '?',
        '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'L', 'S', 'T', 'U', 'V', 'W',
        'X', 'Y', 'Z', '[', '\\' ,']', '^', '_',
        '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
        'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
        'x', 'y', 'z', '{', '|', '}', '~', 'DEL'
    ];
// メモリを初期化
    var release = function () {
        for (var i = 0; i < 256; ++i) {
            memory[i] = 0;
        }
        pointer = 0;
        braces = [];
        brace_stack = [];
    };

// 入力を括弧の対応を取って配列に格納
    var check_brace = function (input) {
        input = token_input(input);
        for (var i in input) {
            var command = input[i];

            if (command == 'イマジネイティブ！') {
                var j = i;

                while (true) {
                    if (input.length <= j) {
                        throw 'invalid brace pare';
                    }

                    if (input[j] == 'イマジネイティブ！') {
                        brace_stack.push(1);
                    }
                    else if (input[j] == 'ロックオン！') {
                        brace_stack.pop();
                    }

                    if (brace_stack.length == 0) {
                        break;
                    }

                    ++j;
                }

                braces[i - 0] = j - 0;
                braces[j - 0] = i - 0;
            }
        }
    };

// 入力を評価
    var eval_input = function (input) {
        var output = '';
        input = token_input(input);

        for (var i = 0; i < input.length; ++i) {
            var command = input[i];
            switch (command) {
                case 'ぞばり':
                    pointer++;
                    break;
                case 'ぞば無双！':
                    pointer--;
                    break;
                case 'ぞ':
                    memory[pointer]++;
                    break;
                case 'ば':
                    memory[pointer]--;
                    break;
                case 'ぞばんざーい':
                    output += chars[memory[pointer]];
                    break;
                case 'イマジネイティブ！':
                    memory[pointer] == 0 && (i = braces[i] + 1);
                    break;
                case 'ロックオン！':
                    memory[pointer] != 0 && (i = braces[i]);
                    break;
            }
            if (pointer < 0 || memory.length <= pointer) {
                throw 'pointer out of range (' + pointer + ')';
            }
        }
        return output;
    };
    function token_input(input){
        var tokens = [
            "イマジネイティブ！",
            "ロックオン！",
            "ぞばんざーい",
            "ぞっば～",
            "ぞばり",
            "ぞば無双！",
            "ぞ",
            "ば"
        ]

        var out = [];
        while(true){
            var token = tokens.find(function(t){
                return input.indexOf(t)==0;
            })
            if(token){
               out.push(token);
               input = input.slice(token.length);
            }else{
                break;
            }
        }
        if(input.length!=0){return false}
        return out;
    }
    this.exec = function(input){
        var output = "";
        try {
            check_brace(input);
            output = eval_input(input);
        } catch (e) {
            output = e;
        }
        return output;
    }

    this.release = release;

    release();
}