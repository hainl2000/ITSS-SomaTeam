<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            [
                'name' => 'Thời trang nam',
                'image' => 'https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn?fbclid=IwAR05f3Gebv7FbXEP6KLbiR44Z605YL8cQCHh7ikIDjcPJMSiwfutofKStTU',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Điện thoại và phụ kiện',
                'image' => 'https://cf.shopee.vn/file/31234a27876fb89cd522d7e3db1ba5ca_tn?fbclid=IwAR1gDJLQBbm0fvB6X9IZsrVIb8x_rElcbbSRnYtSBcteLKq-jwp9qmkthAI',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Thiết bị điện tử',
                'image' => 'https://cf.shopee.vn/file/c3f3edfaa9f6dafc4825b77d8449999d_tn?fbclid=IwAR1mHMsvsUBbNeo7_o-JEiAB5q9alA7hTi-svyrhmep4zAN7HZEgdMJ2XaM',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Máy tính và lap top',
                'image' => 'https://cf.shopee.vn/file/c3f3edfaa9f6dafc4825b77d8449999d_tn?fbclid=IwAR1mHMsvsUBbNeo7_o-JEiAB5q9alA7hTi-svyrhmep4zAN7HZEgdMJ2XaM',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Máy ảnh',
                'image' => 'https://cf.shopee.vn/file/ec14dd4fc238e676e43be2a911414d4d_tn?fbclid=IwAR3i0Gbs83QKtL47L54QBlNSPhzEKWjVeaqGfSWYcnQtfKbqisIo0dTD89I',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Thời trang nữ',
                'image' => 'https://cf.shopee.vn/file/75ea42f9eca124e9cb3cde744c060e4d_tn?fbclid=IwAR1MCJEj4jmSBO4xuYzbpXnnEMTSVgZUgMoA7O-b5eiaGYbtibrS1vPntg4',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Mẹ và bé',
                'image' => 'https://cf.shopee.vn/file/099edde1ab31df35bc255912bab54a5e_tn?fbclid=IwAR2VaEa1Za69GBjj_MafmAEUlOcot-pu_4I1bILUdSqjzFIhAZ5NmvQjVhA',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Nhà cửa và đời sống',
                'image' => 'https://cf.shopee.vn/file/24b194a695ea59d384768b7b471d563f_tn?fbclid=IwAR3mNK9aYArN5jmErzRoGH0KEKAM_5qV0W5zQzALs7zuJYnzgs91Z550KIM',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Sắc đẹp',
                'image' => 'https://cf.shopee.vn/file/ef1f336ecc6f97b790d5aae9916dcb72_tn?fbclid=IwAR1gDJLQBbm0fvB6X9IZsrVIb8x_rElcbbSRnYtSBcteLKq-jwp9qmkthAI',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Sức khỏe',
                'image' => 'https://cf.shopee.vn/file/49119e891a44fa135f5f6f5fd4cfc747_tn?fbclid=IwAR09wmCjxjr91cdCnvGMDyFZh6puC13sVT5BsXRN5kBSIZz5iboDvSbc6XU',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
        ]);
        DB::table('users')->update([
            'image' => 'https://nld.mediacdn.vn/291774122806476800/2021/7/21/hanh-trinh-tu-hot-girl-tra-sua-den-nu-dien-vien-xuat-sac-cua-jun-vu-5d2bf6c0-16267765232751718137907-1626828871161991811676.jpg'
        ]);
//        $this->call(AdminSeeder::class);
//        Product::factory(20)->create();
//        \App\Models\User::factory(5)->create();
        // $this->call(ProductSeeder::class);
        // factory(Product::class, 50)->create();
        //     ->create()
        //     ->each(function($u) {
        //         $m = $u->orders()->save(Order::factory()->make());
        //         $m->each(function($i) {
        //             $i->order_details()->save(OrderDetail::factory()->make());
        //         });
        //     });
        // // \App\Models\OrderDetail::factory(10)->create();
    }
}
