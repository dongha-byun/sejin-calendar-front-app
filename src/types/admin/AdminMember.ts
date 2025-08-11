
export interface AdminMember {
    id: number;
    userId: string;
    password: string;
    companyName: string;
    name: string;
    addr1: string;
    tel1: string;
    fax1: string;
    email: string;
    webhard: string;
    iDate?: Date;
    etc: string;
}