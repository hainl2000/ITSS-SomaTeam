<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgetpasswordMail extends Mailable
{
    use Queueable, SerializesModels;
    private $link;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(string $link)
    {
        $this->link = $link;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env("MAIL_FROM_ADDRESS"),"haiprovip1102@gmail.com")
            ->view('forgetpassword')
            ->subject('Forget Password')
            ->with([
                "link" => $this->link
            ]);
    }
}
