import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 管理画面ユーザ
@Entity({
  name: 'admin_users',
  engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci',
 })
export class AdminUser extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: 'id:自動採番' })
  public id: bigint;

  @Column({ name: 'admin_user_code', nullable: false, type: 'varchar', length: 100, comment: '管理者コード:ユニークな乱数を採番' })
  adminUserCode: string;

  @Column({ name: 'admin_login_id', nullable: false, type: 'varchar', length: 100, comment: 'ログインID:ユニークな乱数を採番' })
  adminLoginId: string;

  @Column({ name: 'password', nullable: false, type: 'varchar', length: 1000, comment: 'パスワード:ハッシュ化したパスワード' })
  password: string;

  @Column({ name: 'role', nullable: true, type: 'int', default: 20, comment: '権限:10：スーパーユーザ\n20：地域管理者（自治体など）\n25：地域一般ユーザ\n30：加盟店管理者\n※当初は地域管理者が利用するとして考える' })
  role: number | null;

  @Column({ name: 'region_code', nullable: false, type: 'varchar', length: 100, comment: '地域コード:regionのキー' })
  regionCode: string;

  @Column({ name: 'admin_user_name', nullable: true, type: 'varchar', length: 100, comment: '管理者名:管理者の名前' })
  adminUserName: string;

  @Column({ name: 'admin_email', nullable: true, type: 'varchar', length: 255, comment: '連絡先メールアドレス:管理者の連絡先' })
  adminEmail: string;

  @Column({ name: 'admin_phone', nullable: true, type: 'varchar', length: 20, comment: '連絡先電話番号:管理者の連絡先' })
  adminPhone: string;

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
