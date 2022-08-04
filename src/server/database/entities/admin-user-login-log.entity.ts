import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 管理画面ユーザログインログ
@Entity({
  name: 'admin_user_login_logs',
  engine: 'InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci',
 })
export class AdminUserLoginLog extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true, comment: 'id:自動採番' })
  public id: bigint;

  @Column({ name: 'admin_login_id', nullable: true, type: 'varchar', length: 100, comment: 'ログインID:ログインIDとして入力した文字' })
  adminLoginId: string;

  @Column({ name: 'ip', nullable: false, type: 'varchar', length: 255, comment: 'IPアドレス' })
  ip: string;

  @Column({ name: 'user_agent', nullable: true, type: 'varchar', length: 500, comment: 'ユーザエージェント' })
  userAgent: string;

  @Column({ name: 'result', nullable: false, type: 'float', comment: '結果:０：正常、１：ログインエラー、２：ログインロック' })
  result: number;

  @Column({ name: 'admin_user_code', nullable: true, type: 'varchar', length: 100, comment: '管理者コード:admin_usersのキー' })
  adminUserCode: string;

  @Column({ name: 'message', nullable: true, type: 'varchar', length: 4000, comment: 'メッセージ:エラー内容などの文言を保存する' })
  message: string;

  @Column({ name: 'login_at', type: 'datetime', precision: 0, default: null, comment: 'ログイン日時:ログイン実施日時を保存する' })
  loginAt: Date;

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
