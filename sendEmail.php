<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Ambil kredensial email dari environment variable atau konfigurasi server
$email_host = 'smtp.gmail.com';
$email_user = getenv('SMTP_USER'); // Simpan di .env atau konfigurasi server
$email_pass = getenv('SMTP_PASS'); // Simpan di .env atau konfigurasi server
$email_to   = 'raehanmukti03@gmail.com'; // Ganti dengan email tujuan utama

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['contactName'] ?? '');
    $email = trim($_POST['contactEmail'] ?? '');
    $subject = trim($_POST['contactSubject'] ?? '');
    $message = trim($_POST['contactMessage'] ?? '');

    $mail = new PHPMailer(true);

    try {
        // Konfigurasi SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'raehanmukti03@gmail.com'; // Ganti dengan email Anda
        $mail->Password = 'qeyvsekdmxjcxikj'; // Ganti dengan password aplikasi
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Pengaturan Email
        $mail->setFrom($email, $name);
        $mail->addAddress('raehanmukti03@gmail.com'); // Ganti dengan email penerima
        $mail->addReplyTo($email, $name);

        // Konten Email
        $mail->isHTML(true);
        $mail->Subject = !empty($subject) ? $subject : 'No Subject';
        $mail->Body = nl2br("Name: $name <br>Email: $email <br>Message: $message");

        $mail->send();
        echo "<script>alert('Pesan berhasil dikirim!'); window.location.href='index.html';</script>";
    } catch (Exception $e) {
        echo "<script>alert('Pesan gagal dikirim: {$mail->ErrorInfo}');</script>";
    }
} else {
    header("Location: index.html");
    exit();
}
?>
