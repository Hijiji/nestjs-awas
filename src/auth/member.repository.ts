import { CustomRepository } from "src/typeorm.decorator";
import { DataSource, Repository } from "typeorm";
import { Member } from "./member.entity";

@CustomRepository(Member)
export class MemberRepository extends Repository<Member>{

    constructor(private dataSource: DataSource) {
        super(Member, dataSource.createEntityManager());
    }
}