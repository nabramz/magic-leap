export class UUID {
        constructor(
            UUIDlength = length,
            charset = { 
              chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 
              nums: '1234567890' 
            }
        ) {
            this.result = '';
            this.length = UUIDlength;
            this.fullCharset = (charset.nums + charset.chars + charset.nums).split('');
            this.prevUUIDs = [];
        }
        
        clear(){
            this.prevUUIDs = [];
        }

        new(length = this.UUIDlength){
            this.generate(length);
            return this.output();
        }

        rand(limit) {
            return Math.floor(Math.random() * limit);
        }

        randomCase(char) {
            const caseMethodNames = ["toLowerCase", "toUpperCase"],
                  dynamicCaseMethodName = caseMethodNames[this.rand(caseMethodNames.length)];
            
            return char[dynamicCaseMethodName]();
        }
        
        getRandomGUIDChar(){
            return this.fullCharset[this.rand(this.fullCharset.length)];
        }

        generate(length) {
            const curUUIDLength = this.result.length;
            let index;

            for (index = length; this.result.length < index;) {
                this.result += this.randomCase(this.getRandomGUIDChar());
            }
        }
        
        regenerate(){
            this.result = '';
            this.generate(this.length);
            return this.result;
        }

        output() {
            const allPrevUUIDs = this.prevUUIDs.join(''),
                  resultUUID = this.result,
                  resultExistsInPrevUUIDs = allPrevUUIDs.indexOf(resultUUID) > -1;
            
                if (resultExistsInPrevUUIDs){
                    this.regenerate();
                    return this.output();
                }
            
            this.prevUUIDs.push(this.result);
            
            return this.result; 
        }
}

export default UUID;