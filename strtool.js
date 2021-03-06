var widen = function(s)
{
	var out = "";
	for (var i = 0; i < s.length; i++)
	{
		var code = s.charCodeAt(i);
		if (code >= 0x21 && code <= 0x7e)
		{
			out += String.fromCodePoint(code + 0xfee0)
		}
		else
		{
			out += s.charAt(i)
		};
	};
	return out
};

var rotn = function(n, s)
{
	var out = "";
	for (var i = 0; i < s.length; i++)
	{
		var code = s.charCodeAt(i);
		if (code >= 0x41 && code <= 0x5a)
		{
			code -= 0x41;
			code += n;
			while (code < 0) code += 26;
			code %= 26;
			code += 0x41;
		}
		else if (code >= 0x61 && code <= 0x7a)
		{
			code -= 0x61;
			code += n;
			while (code < 0) code += 26;
			code %= 26;
			code += 0x61;
		};
		out += String.fromCodePoint(code)
	};
	return out
};

var obfuscate = function(s)
{
	var out = "";
	var table = {
		"A": ["Α", "А", "Ɑ", "Ａ", "𝐀", "𝐴", "𝑨", "𝖠", "𝗔", "𝘈", "𝘼", "𝒜", "𝓐", "𝔄", "𝕬", "𝙰", "𝔸", "𝚨", "𝛢", "𝜜", "𝝖", "𝞐", "ᴀ", "Ꭿ", "Ꭺ", "𐌀"],
		"B": ["Β", "В", "Б", "ʙ", "฿", "Ｂ", "𝐁", "𝐵", "𝑩", "𝖡", "𝗕", "𝘉", "𝘽", "ℬ", "𝓑", "𝔅", "𝕭", "𝙱", "𝔹", "𝚩", "𝛣", "𝜝", "𝝗", "𝞑", "Ᏸ", "Ᏼ", "ᛒ", "𐌁"],
		"C": ["ʗ", "ℂ", "₡", "₵", "Ｃ", "𝐂", "𝐶", "𝑪", "𝖢", "𝗖", "𝘊", "𝘾", "𝒞", "𝓒", "ℭ", "𝕮", "𝙲", "ℂ", "С", "Ꮯ", "𐌂"],
		"D": ["Δ", "Д", "Ð", "Ｄ", "𝐃", "𝐷", "𝑫", "𝖣", "𝗗", "𝘋", "𝘿", "𝒟", "𝓓", "𝔇", "𝕯", "𝙳", "𝔻", "𝚫", "𝛥", "𝜟", "𝝙", "𝞓", "Ꭰ", "𐌃"],
		"E": ["Ε", "Е", "Є", "Э", "Ɛ", "Ə", "Ǝ", "∈", "€", "∃", "ℇ", "Ｅ", "𝐄", "𝐸", "𝑬", "𝖤", "𝗘", "𝘌", "𝙀", "ℰ", "𝓔", "𝔈", "𝕰", "𝙴", "𝔼", "Σ", "𝚬", "𝛦", "𝜠", "𝝚", "𝞔", "𝚺", "𝛴", "𝜮", "𝝨", "𝞢", "ﾼ", "Ꭼ", "Ꮛ", "𐌄"],
		"F": ["Ϝ", "₣", "Ƒ", "Ｆ", "𝐅", "𝐹", "𝑭", "𝖥", "𝗙", "𝘍", "𝙁", "ℱ", "𝓕", "𝔉", "𝕱", "𝙵", "𝔽", "𝟊", "𐌅"],
		"G": ["₲", "ɢ", "Ｇ", "𝐆", "𝐺", "𝑮", "𝖦", "𝗚", "𝘎", "𝙂", "𝒢", "𝓖", "𝔊", "𝕲", "𝙶", "𝔾", "ʛ", "Ꮐ", "Ꮹ", "Ᏻ"],
		"H": ["Η", "Ｈ", "𝐇", "𝐻", "𝑯", "𝖧", "𝗛", "𝘏", "𝙃", "ℋ", "𝓗", "ℌ", "𝕳", "𝙷", "ℍ", "𝚮", "𝛨", "𝜢", "𝝜", "𝞖", "Ꮋ", "ᚺ", "ᚻ", "Ӊ", "Ң", "Ӈ", "Ҥ"],
		"I": ["İ", "Ｉ", "ɪ", "𝐈", "𝐼", "𝑰", "𝖨", "𝗜", "𝘐", "𝙄", "ℐ", "𝓘", "ℑ", "𝕴", "𝙸", "𝕀", "𝚰", "𝛪", "𝜤", "𝝞", "𝞘", "ᵻ", "ｴ", "ｪ", "Ꮖ", "𐌆", "𐌉"],
		"J": ["Ｊ", "𝐉", "𝐽", "𝑱", "𝖩", "𝗝", "𝘑", "𝙅", "𝒥", "𝓙", "𝔍", "𝕵", "𝙹", "𝕁", "Ꮰ", "Ꭻ"],
		"K": ["Κ", "К", "₭", "K", "Ｋ", "𝐊", "𝐾", "𝑲", "𝖪", "𝗞", "𝘒", "𝙆", "𝒦", "𝓚", "𝔎", "𝕶", "𝙺", "𝕂", "𝚱", "𝛫", "𝜥", "𝝟", "𝞙", "Ꮶ", "ᛕ", "𐌊", "Қ", "Ӄ", "Ҡ", "Ҟ", "Ҝ", "Ԟ"],
		"L": ["ℒ", "£", "₤", "Ｌ", "𝐋", "𝐿", "𝑳", "𝖫", "𝗟", "𝘓", "𝙇", "ℒ", "𝓛", "𝔏", "𝕷", "𝙻", "𝕃", "ʟ", "￡", "ﾤ", "Ꮭ", "Ꮮ", "𐌋"],
		"M": ["Μ", "М", "Ｍ", "𝐌", "𝑀", "𝑴", "𝖬", "𝗠", "𝘔", "𝙈", "ℳ", "𝓜", "𝔐", "𝕸", "𝙼", "𝕄", "𝚳", "𝛭", "𝜧", "𝝡", "𝞛", "Ꮇ", "𐌑", "Ӎ", "Ꙧ"],
		"N": ["Ν", "₦", "Ｎ", "𝐍", "𝑁", "𝑵", "𝖭", "𝗡", "𝘕", "𝙉", "𝒩", "𝓝", "𝔑", "𝕹", "𝙽", "ℕ", "𝚴", "𝛮", "𝜨", "𝝢", "𝞜", "ɴ", "Ŋ"],
		"O": ["Ο", "О", "Օ", "∅", "Ｏ", "𝐎", "𝑂", "𝑶", "𝖮", "𝗢", "𝘖", "𝙊", "𝒪", "𝓞", "𝔒", "𝕺", "𝙾", "𝕆", "Θ", "𝚯", "𝛩", "𝜣", "𝝝", "𝞗", "𝚶", "𝛰", "𝜪", "𝝤", "𝞞", "Ω", "𝛀", "𝛺", "𝜴", "𝝮", "𝞨", "Ꮎ", "Ꮻ", "Ꭴ", "𐌏"],
		"P": ["₱", "℗", "Ｐ", "Ρ", "𐌓", "Р", "𝐏", "𝑃", "𝑷", "𝖯", "𝗣", "𝘗", "𝙋", "𝒫", "𝓟", "𝔓", "𝕻", "𝙿", "ℙ", "₽", "𝚸", "𝛲", "𝜬", "𝝧", "𝞡", "Ꮲ", "𐌓", "Ҏ"],
		"Q": ["Ϙ", "Ԛ", "Ｑ", "𝐐", "𝑄", "𝑸", "𝖰", "𝗤", "𝘘", "𝙌", "𝒬", "𝓠", "𝔔", "𝕼", "𝚀", "ℚ"],
		"R": ["ᚱ", "Ꞃ", "𝐑", "𝑅", "𝑹", "𝖱", "𝗥", "𝘙", "𝙍", "ℛ", "𝓡", "ℜ", "𝕽", "Ｒ", "Ꝛ", "℟", "®", "ʀ", "Ꭱ", "Ꮢ"],
		"S": ["𝐒", "𝑆", "𝑺", "𝖲", "𝗦", "𝘚", "𝙎", "𝒮", "𝓢", "𝔖", "𝕾", "𝚂", "𝕊", "Ｓ", "Ƨ", "$", "§", "∫", "ᶋ", "ʃ", "Ꮥ", "Ꮪ", "𐌔"],
		"T": ["𝐓", "𝑇", "𝑻", "𝖳", "𝗧", "𝘛", "𝙏", "𝒯", "𝓣", "𝔗", "𝕿", "𝚃", "𝕋", "Ｔ", "Τ", "Т", "₮", "₸", "𝚻", "𝛵", "𝜯", "𝝩", "𝞣", "ￓ", "Ꭲ", "𐌕", "Ꚑ", "Ҭ", "Ꚍ"],
		"U": ["𝐔", "𝑈", "𝑼", "𝖴", "𝗨", "𝘜", "𝙐", "𝒰", "𝓤", "𝔘", "𝖀", "𝚄", "𝕌", "Ｕ", "∪", "Ꮜ"],
		"V": ["𝐕", "𝑉", "𝑽", "𝖵", "𝗩", "𝘝", "𝙑", "𝒱", "𝓥", "𝔙", "𝖁", "𝚅", "𝕍", "Ｖ", "Ѵ", "∨", "℣", "Ʋ", "Ꮩ", "𐌞", "Ѵ", "Ѷ"],
		"W": ["𝐖", "𝑊", "𝑾", "𝖶", "𝗪", "𝘞", "𝙒", "𝒲", "𝓦", "𝔚", "𝖂", "𝚆", "𝕎", "Ｗ", "₩", "Ꮃ", "Ꮤ", "Ѡ", "Ԝ", "Ѿ"],
		"X": ["𝐗", "𝑋", "𝑿", "𝖷", "𝗫", "𝘟", "𝙓", "𝒳", "𝓧", "𝔛", "𝖃", "𝚇", "𝕏", "Ｘ", "Χ", "Х", "ᚷ", "𝚾", "𝛸", "𝜲", "𝝬", "𝞦", "𐌗", "Ҳ", "Ӽ"],
		"Y": ["𝐘", "𝑌", "𝒀", "𝖸", "𝗬", "𝘠", "𝙔", "𝒴", "𝓨", "𝔜", "𝖄", "𝚈", "𝕐", "Ｙ", "Υ", "У", "Ү", "Ұ", "¥", "𝚼", "𝛶", "𝜰", "𝝪", "𝞤", "Ꭹ", "Ꮍ", "𐌖"],
		"Z": ["𝐙", "𝑍", "𝒁", "𝖹", "𝗭", "𝘡", "𝙕", "𝒵", "𝓩", "ℨ", "𝖅", "𝚉", "ℤ", "Ｚ", "Ζ", "З", "Ɀ", "𝚭", "𝛧", "𝜡", "𝝛", "𝞕", "Ꮓ"],
		"a": ["α", "а", "ɑ", "ａ", "𝐚", "𝑎", "𝒂", "𝖺", "𝗮", "𝘢", "𝙖", "𝒶", "𝓪", "𝔞", "𝖆", "𝚊", "𝕒", "𝛂", "𝛼", "𝜶", "𝝰", "𝞪"],
		"b": ["β", "в", "б", "ɓ", "β", "␢", "♭", "ｂ", "𝐛", "𝑏", "𝒃", "𝖻", "𝗯", "𝘣", "𝙗", "𝒷", "𝓫", "𝔟", "𝖇", "𝚋", "𝕓", "𝛃", "𝛽", "𝜷", "𝝱", "𝞫", "ᶀ", "Ꮟ", "Ꮾ", "𐌜"],
		"c": ["©", "¢", "ｃ", "𝐜", "𝑐", "𝒄", "𝖼", "𝗰", "𝘤", "𝙘", "𝒸", "𝓬", "𝔠", "𝖈", "𝚌", "𝕔", "с", "ƈ", "￠"],
		"d": ["δ", "д", "ð", "ɖ", "₫", "∂", "ｄ", "𝐝", "𝑑", "𝒅", "𝖽", "𝗱", "𝘥", "𝙙", "𝒹", "𝓭", "𝔡", "𝖉", "𝚍", "𝕕", "𝛅", "𝛿", "𝜹", "𝝳", "𝞭", "𝛛", "𝜕", "𝝏", "𝞉", "𝟃", "ᶁ", "ɗ"],
		"e": ["ε", "е", "є", "э", "ɛ", "ə", "ǝ", "ɚ", "ɜ", "ɝ", "℮", "ℯ", "ｅ", "𝐞", "𝑒", "𝒆", "𝖾", "𝗲", "𝘦", "𝙚", "ℯ", "𝓮", "𝔢", "𝖊", "𝚎", "𝕖", "𝛆", "𝜀", "𝜺", "𝝴", "𝞮", "ϵ", "𝛜", "𝜖", "𝝐", "𝞊", "𝟄"],
		"f": ["ϝ", "ƒ", "ｆ", "𝐟", "𝑓", "𝒇", "𝖿", "𝗳", "𝘧", "𝙛", "𝒻", "𝓯", "𝔣", "𝖋", "𝚏", "𝕗", "𝟋", "ᶂ"],
		"g": ["ɡ", "ｇ", "𝐠", "𝑔", "𝒈", "𝗀", "𝗴", "𝘨", "𝙜", "ℊ", "𝓰", "𝔤", "𝖌", "𝚐", "𝕘", "ᶃ", "ɠ"],
		"h": ["Һ", "һ", "h", "ℏ", "ɦ", "ｈ", "𝐡", "ℎ", "𝒉", "𝗁", "𝗵", "𝘩", "𝙝", "𝒽", "𝓱", "𝔥", "𝖍", "𝚑", "𝕙", "ħ", "ɧ", "Ꮒ", "Ᏺ", "ӊ", "ң", "ӈ", "ҥ"],
		"i": ["ı", "ｉ", "𝐢", "𝑖", "𝒊", "𝗂", "𝗶", "𝘪", "𝙞", "𝒾", "𝓲", "𝔦", "𝖎", "𝚒", "𝕚", "𝚤", "𝛊", "𝜄", "𝜾", "𝝸", "𝞲", "ɨ", "Ꭵ"],
		"j": ["ȷ", "ʝ", "ｊ", "𝐣", "𝑗", "𝒋", "𝗃", "𝗷", "𝘫", "𝙟", "𝒿", "𝓳", "𝔧", "𝖏", "𝚓", "𝕛", "𝚥"],
		"k": ["κ", "ϰ", "к", "ｋ", "𝐤", "𝑘", "𝒌", "𝗄", "𝗸", "𝘬", "𝙠", "𝓀", "𝓴", "𝔨", "𝖐", "𝚔", "𝕜", "𝛋", "𝜅", "𝜿", "𝝹", "𝞳", "ϰ", "𝛞", "𝜘", "𝝒", "𝞌", "𝟆", "ᶄ", "ƙ", "қ", "ӄ", "ҡ", "ҟ", "ҝ", "ԟ"],
		"l": ["ℓ", "ɫ", "ɬ", "ɭ", "ｌ", "𝐥", "𝑙", "𝒍", "𝗅", "𝗹", "𝘭", "𝙡", "𝓁", "𝓵", "𝔩", "𝖑", "𝚕", "𝕝", "ᶅ", "ł"],
		"m": ["м", "ɱ", "₥", "ｍ", "𝐦", "𝑚", "𝒎", "𝗆", "𝗺", "𝘮", "𝙢", "𝓂", "𝓶", "𝔪", "𝖒", "𝚖", "𝕞", "ʍ", "ᶆ", "ӎ", "ꙧ"],
		"n": ["ŋ", "ɲ", "ɳ", "ｎ", "𝐧", "𝑛", "𝒏", "𝗇", "𝗻", "𝘯", "𝙣", "𝓃", "𝓷", "𝔫", "𝖓", "𝚗", "𝕟", "η", "𝛈", "𝜂", "𝜼", "𝝶", "𝞰", "ƞ", "ᶇ"],
		"o": ["ο", "о", "օ", "ɔ", "ɵ", "ｏ", "𝐨", "𝑜", "𝒐", "𝗈", "𝗼", "𝘰", "𝙤", "ℴ", "𝓸", "𝔬", "𝖔", "𝚘", "𝕠", "σ", "𝛐", "𝜊", "𝝄", "𝝾", "𝞸", "𝛔", "𝜎", "𝝈", "𝞂", "𝞼"],
		"p": ["℘", "ｐ", "ρ", "р", "𝐩", "𝑝", "𝒑", "𝗉", "𝗽", "𝘱", "𝙥", "𝓅", "𝓹", "𝔭", "𝖕", "𝚙", "𝕡", "𝛒", "𝜌", "𝝆", "𝞀", "𝞺", "ᶈ", "ƥ", "ҏ"],
		"q": ["ϙ", "ԛ", "ｑ", "𝐪", "𝑞", "𝒒", "𝗊", "𝗾", "𝘲", "𝙦", "𝓆", "𝓺", "𝔮", "𝖖", "𝚚", "𝕢", "ʠ"],
		"r": ["ꞃ", "ɾ", "ɽ", "𝐫", "𝑟", "𝒓", "𝗋", "𝗿", "𝘳", "𝙧", "𝓇", "𝓻", "𝔯", "𝖗", "ｒ", "ꝛ", "ᶉ", "ɼ"],
		"s": ["𝐬", "𝑠", "𝒔", "𝗌", "𝘀", "𝘴", "𝙨", "𝓈", "𝓼", "𝔰", "𝖘", "𝚜", "𝕤", "ｓ", "ƨ", "ς", "𝛓", "𝜍", "𝝇", "𝞁", "𝞻", "ᶊ"],
		"t": ["𝐭", "𝑡", "𝒕", "𝗍", "𝘁", "𝘵", "𝙩", "𝓉", "𝓽", "𝔱", "𝖙", "𝚝", "𝕥", "ｔ", "τ", "т", "𝛕", "𝜏", "𝝉", "𝞃", "𝞽", "ƫ", "ƭ", "ʈ", "ꚑ", "ҭ", "ꚍ"],
		"u": ["𝐮", "𝑢", "𝒖", "𝗎", "𝘂", "𝘶", "𝙪", "𝓊", "𝓾", "𝔲", "𝖚", "𝚞", "𝕦", "ｕ", "υ", "ʊ", "μ", "𝛍", "𝜇", "𝝁", "𝝻", "𝞵", "𝛖", "𝜐", "𝝊", "𝞄", "𝞾", "ᵿ"],
		"v": ["𝐯", "𝑣", "𝒗", "𝗏", "𝘃", "𝘷", "𝙫", "𝓋", "𝓿", "𝔳", "𝖛", "𝚟", "𝕧", "ｖ", "ѵ", "ⱴ", "ⱱ", "ʋ", "ν", "𝛎", "𝜈", "𝝂", "𝝼", "𝞶", "ᶌ", "ѵ", "ѷ"],
		"w": ["𝐰", "𝑤", "𝒘", "𝗐", "𝘄", "𝘸", "𝙬", "𝓌", "𝔀", "𝔴", "𝖜", "𝚠", "𝕨", "ｗ", "ɯ", "ɰ", "ω", "𝛚", "𝜔", "𝝎", "𝞈", "𝟂", "ѡ", "ԝ", "ѿ"],
		"x": ["𝐱", "𝑥", "𝒙", "𝗑", "𝘅", "𝘹", "𝙭", "𝓍", "𝔁", "𝔵", "𝖝", "𝚡", "𝕩", "ｘ", "χ", "х", "χ", "𝛘", "𝜒", "𝝌", "𝞆", "𝟀", "ᶍ", "ҳ", "ӽ"],
		"y": ["𝐲", "𝑦", "𝒚", "𝗒", "𝘆", "𝘺", "𝙮", "𝓎", "𝔂", "𝔶", "𝖞", "𝚢", "𝕪", "ｙ", "у", "ү", "ұ", "γ", "𝛄", "𝛾", "𝜸", "𝝲", "𝞬"],
		"z": ["𝐳", "𝑧", "𝒛", "𝗓", "𝘇", "𝘻", "𝙯", "𝓏", "𝔃", "𝔷", "𝖟", "𝚣", "𝕫", "ｚ", "ζ", "з", "ɀ", "ʒ", "ʑ", "ʐ", "𝛇", "𝜁", "𝜻", "𝝵", "𝞯", "ƺ", "ᶎ", "ʓ"]
	};
	for (var i = 0; i < s.length; i++)
	{
		var c = s.charAt(i);
		if (c in table)
		{
			var arr = table[c];
			var c2 = arr[Math.floor(Math.random() * arr.length)];
			out += c2
		}
		else
		{
			out += c
		};
	};
	return out
};

var obfuscate2 = function(s)
{
	if(0 == s.length)
		return s;
	var check = function(str)
	{
		var nonlat = function(c)
		{
			return (-1 != [
				"Α", "А", "Ɑ", "𝚨", "𝛢", "𝜜", "𝝖", "𝞐", "ᴀ", "Ꭿ", "Ꭺ", "𐌀",
				"Β", "В", "Б", "ʙ", "฿", "𝚩", "𝛣", "𝜝", "𝝗", "𝞑", "Ᏸ", "Ᏼ", "ᛒ", "𐌁",
				"ʗ", "ℂ", "₡", "₵", "С", "Ꮯ", "𐌂",
				"Δ", "Д", "𝚫", "𝛥", "𝜟", "𝝙", "𝞓", "Ꭰ", "𐌃",
				"Ε", "Е", "Є", "Э", "Ɛ", "Ə", "Ǝ", "∈", "€", "∃", "ℇ",
				"Ϝ", "₣", "Ƒ", "𐌅",
				"₲", "ɢ", "ʛ", "Ꮐ", "Ꮹ", "Ᏻ",
				"𝚮", "𝛨", "𝜢", "𝝜", "𝞖", "Ꮋ", "ᚺ", "ᚻ", "Ӊ", "Ң", "Ӈ", "Ҥ",
				"𝚰", "𝛪", "𝜤", "𝝞", "𝞘", "ᵻ", "ｴ", "ｪ", "Ꮖ", "𐌆", "𐌉",
				"Ꮰ", "Ꭻ",
				"Κ", "К", "₭", "K",
				"𝚱", "𝛫", "𝜥", "𝝟", "𝞙", "Ꮶ", "ᛕ", "𐌊", "Қ", "Ӄ", "Ҡ", "Ҟ", "Ҝ", "Ԟ",
				"ℒ", "£", "₤", "ʟ", "￡", "ﾤ", "Ꮭ", "Ꮮ", "𐌋",
				"Μ", "М", "𝚳", "𝛭", "𝜧", "𝝡", "𝞛", "Ꮇ", "𐌑", "Ӎ", "Ꙧ",
				"Ν", "₦", "𝚴", "𝛮", "𝜨", "𝝢", "𝞜", "ɴ", "Ŋ",
				"Ο", "О", "Օ", "∅", "Θ", "𝚯", "𝛩", "𝜣", "𝝝", "𝞗", "𝚶", "𝛰", "𝜪", "𝝤", "𝞞", "Ω", "𝛀", "𝛺", "𝜴", "𝝮", "𝞨", "Ꮎ", "Ꮻ", "Ꭴ", "𐌏",
				"₱", "℗", "₽", "𝚸", "𝛲", "𝜬", "𝝧", "𝞡", "Ꮲ", "𐌓", "Ҏ",
				"Ϙ", "Ԛ",
				"ᚱ", "Ꞃ", "Ꝛ", "℟", "®", "ʀ", "Ꭱ", "Ꮢ",
				"Ƨ", "$", "§", "∫", "ᶋ", "ʃ", "Ꮥ", "Ꮪ", "𐌔",
				"Τ", "Т", "₮", "₸", "𝚻", "𝛵", "𝜯", "𝝩", "𝞣", "ￓ", "Ꭲ", "𐌕", "Ꚑ", "Ҭ", "Ꚍ",
				"Ｕ", "∪", "Ꮜ",
				"Ѵ", "∨", "℣", "Ʋ", "Ꮩ", "𐌞", "Ѵ", "Ѷ",
				"₩", "Ꮃ", "Ꮤ", "Ѡ", "Ԝ", "Ѿ",
				"Ｘ", "Χ", "Х", "ᚷ", "𝚾", "𝛸", "𝜲", "𝝬", "𝞦", "𐌗", "Ҳ", "Ӽ",
				"Ｙ", "Υ", "У", "Ү", "Ұ", "¥", "𝚼", "𝛶", "𝜰", "𝝪", "𝞤", "Ꭹ", "Ꮍ", "𐌖",
				"Ｚ", "Ζ", "З", "Ɀ", "𝚭", "𝛧", "𝜡", "𝝛", "𝞕", "Ꮓ",
				"α", "а", "ɑ", "𝛂", "𝛼", "𝜶", "𝝰", "𝞪",
				"β", "в", "б", "ɓ", "β", "␢", "♭", "𝛃", "𝛽", "𝜷", "𝝱", "𝞫", "ᶀ", "Ꮟ", "Ꮾ", "𐌜",
				"©", "¢", "с", "ƈ", "￠",
				"δ", "д", "ð", "ɖ", "₫", "∂",
				"ε", "е", "є", "э", "ɛ", "ə", "ǝ", "ɚ", "ɜ", "ɝ", "𝛆", "𝜀", "𝜺", "𝝴", "𝞮", "ϵ", "𝛜", "𝜖", "𝝐", "𝞊", "𝟄",
				"ϝ", "ƒ", "𝟋", "ᶂ",
				"ɡ", "ᶃ", "ɠ",
				"Һ", "һ", "h", "ℏ", "ɦ", "ħ", "ɧ", "Ꮒ", "Ᏺ", "ӊ", "ң", "ӈ", "ҥ",
				"𝚤", "𝛊", "𝜄", "𝜾", "𝝸", "𝞲", "ɨ", "Ꭵ",
				"ȷ", "ʝ", "𝚥",
				"κ", "ϰ", "к",
				"ℓ", "ɫ", "ɬ", "ɭ", "ᶅ", "ł",
				"м", "ɱ", "₥", "ʍ", "ᶆ", "ӎ", "ꙧ",
				"ο", "о", "օ", "ɔ", "ɵ", "σ", "𝛐", "𝜊", "𝝄", "𝝾", "𝞸", "𝛔", "𝜎", "𝝈", "𝞂", "𝞼",
				"℘", "𝛒", "𝜌", "𝝆", "𝞀", "𝞺", "ᶈ", "ƥ", "ҏ",
				"ϙ", "ԛ", "ʠ",
				"ꞃ", "ɾ", "ɽ", "ꝛ", "ᶉ", "ɼ",
				"ƨ", "ς", "𝛓", "𝜍", "𝝇", "𝞁", "𝞻", "ᶊ",
				"τ", "т", "𝛕", "𝜏", "𝝉", "𝞃", "𝞽", "ƫ", "ƭ", "ʈ", "ꚑ", "ҭ", "ꚍ",
				"υ", "ʊ", "μ", "𝛍", "𝜇", "𝝁", "𝝻", "𝞵", "𝛖", "𝜐", "𝝊", "𝞄", "𝞾", "ᵿ",
				"ѵ", "ⱴ", "ⱱ", "ʋ", "ν", "𝛎", "𝜈", "𝝂", "𝝼", "𝞶", "ᶌ", "ѵ", "ѷ",
				"ɯ", "ɰ", "ω", "𝛚", "𝜔", "𝝎", "𝞈", "𝟂", "ѡ", "ԝ", "ѿ",
				"χ", "х", "χ", "𝛘", "𝜒", "𝝌", "𝞆", "𝟀", "ᶍ", "ҳ", "ӽ",
				"у", "ү", "ұ", "γ", "𝛄", "𝛾", "𝜸", "𝝲", "𝞬",
				"ζ", "з", "ɀ", "ʒ", "ʑ", "ʐ", "𝛇", "𝜁", "𝜻", "𝝵", "𝞯", "ƺ", "ᶎ", "ʓ"
			].indexOf(c));
		};
		var u = true;
		for(var i = 0; i < str.length; ++i)
		{
			if(nonlat(str[i]))
				return true;
			var code = str.charCodeAt(i);
			if((code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a))
				u = false;
		};
		return u;
	};
	var out;
	do
	{
		out = obfuscate(s);
	} while (!check(out));
	return out;
};

var update = function()
{
	var func = function(s){return s};
	var radios = document.getElementsByName("func");
	var fname = "";
	for(var i = 0; i < radios.length; ++i)
	{
		if(radios[i].checked)
		{
			switch(radios[i].value)
			{
				case "rotn":
					var rotnum = parseInt(document.getElementById("rotnum").value);
					func = function(s){return rotn(rotnum, s)};
					fname = "rot" + String(rotnum);
					break;
				case "widen":
					func = widen;
					fname = "widen";
					break;
				case "obfuscate":
					func = obfuscate2;
					fname = "obfuscate";
					break;
				default: break;
			}
			break;
		}
	}
	var input = document.getElementById("input").value;
	output = func(input);
	document.getElementById("output").value = output;
	var link = document.getElementById("bookmarklet");
	link.href = encodeURI(
		"javascript:function(){" +
		widen.toString() +
		rotn.toString() +
		obfuscate.toString() +
		obfuscate2.toString() +
		"var func = " + func.toString() +
		"document.execCommand('insertText', false, func(window.getSelection()+''))})();"
		);
	link.innerHTML = fname;
}
