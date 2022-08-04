import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 管理ユーザ権限
@Entity({
  name: 'admin_user_role_mappings',
  engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci',
 })
export class AdminUserRoleMapping extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: 'id:自動採番' })
  public id: bigint;

  @Column({ name: 'screen_id', nullable: false, type: 'varchar', length: 100, comment: '画面ID' })
  screenId: string;

  @Column({ name: 'screen_name', nullable: false, type: 'varchar', length: 100, comment: '画面名' })
  screenName: string;

  @Column({ name: 'role_condition', nullable: false, type: 'varchar', length: 1000, comment: 'ロール許可値' })
  roleCondition: string;

  @Column({ name: 'screen_url', nullable: false, type: 'varchar', length: 255, comment: '画面URL' })
  screenUrl: string;

  @Column({ name: 'menu_sort', nullable: false, type: 'float', comment: 'メニュー表示順:０に近いほど上に表示' })
  menuSort: number;

  @Column({ name: 'is_show_menu', default: '0', type: 'tinyint', precision: 1, unsigned: true, comment: 'フロント表示フラグ:０：非表示、１：表示' })
  isShowMenu: boolean;

  @Column({ name: 'is_active', default: '1', type: 'tinyint', precision: 1, unsigned: true, comment: 'フロント表示フラグ:０：非表示、１：表示' })
  isActive: boolean;

  @Column({ name: 'created_at', type: 'datetime', precision: 0, default: () => 'CURRENT_TIMESTAMP(0)', comment: '登録日時' })
  readonly createAt: Date;

  @Column({ name: 'created_user', nullable: true, type: 'varchar', length: 100, comment: '登録ユーザ' })
  createdUser: string | null;

  @Column({ name: 'created_channel', nullable: true, type: 'int', comment: '登録チャネル:1:フロントユーザ\n2：加盟店スタッフ\n10:管理画面ユーザ\n20:バッチ\n0:SE作業' })
  createdChannel: number | null;

  @Column({ name: 'update_at', type: 'datetime', precision: 0, default: () => 'CURRENT_TIMESTAMP(0)', onUpdate: 'CURRENT_TIMESTAMP(0)', comment: '更新日時' })
  readonly updateAt: Date;

  @Column({ name: 'updated_user', nullable: true, type: 'varchar', length: 100, comment: '更新ユーザ' })
  updatedUser: string | null;

  @Column({ name: 'updated_channel', nullable: true, type: 'int', comment: '更新チャネル:1:フロントユーザ\n2：加盟店スタッフ\n10:管理画面ユーザ\n20:バッチ\n0:SE作業' })
  updatedChannel: number | null;

  @Column({ name: 'deleted_at', type: 'datetime', precision: 0, default: null, comment: '削除日' })
  deletedAt: Date;
}
