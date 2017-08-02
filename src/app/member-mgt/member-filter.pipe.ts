import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'memberFilter'
})

export class MemberFilterPipe implements PipeTransform {
    transform(members: any, args: any[]): any {
        console.log('args :',args);
        return members.filter((member) => {
            return member.phone.includes(args) || member.name.includes(args);
        });
    }
}