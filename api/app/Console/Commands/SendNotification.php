<?php

namespace App\Console\Commands;

use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Mockery\Matcher\Not;

class SendNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:send_notification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send notifications';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $notifications = Notification::where([
            ['status', '=', 0],
            ['send_time', '<=', Carbon::now()]
        ])->get();
        try {
            foreach ($notifications as $noti) {
                DB::beginTransaction();
                Mail::send('notification',['content' => $noti->content], function ($message) use ($noti){
                    $message->to($noti->email)->subject('Thông báo từ shopping cart');
                });
                $noti->status = 1;
                $noti->save();
                DB::commit();
                sleep(2);
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
        return 0;
    }
}
