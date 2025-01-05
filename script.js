// Fungsi untuk menampilkan transaksi yang disimpan di LocalStorage
window.onload = function() {
    displayTransactions();
};

// Menampilkan daftar transaksi
function displayTransactions() {
    const tableBody = document.getElementById('transaction-table-body');
    tableBody.innerHTML = "";  // Menghapus data lama

    // Ambil daftar transaksi dari LocalStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.forEach(function(transaction) {
        const row = document.createElement('tr');

        // Kolom Tanggal Transaksi
        const tdDate = document.createElement('td');
        tdDate.textContent = transaction.date;
        row.appendChild(tdDate);

        // Kolom Jenis Transaksi
        const tdCategory = document.createElement('td');
        tdCategory.textContent = transaction.category;
        row.appendChild(tdCategory);

        // Kolom Jumlah
        const tdAmount = document.createElement('td');
        tdAmount.textContent = transaction.amount;
        row.appendChild(tdAmount);

        // Kolom Status
        const tdStatus = document.createElement('td');
        tdStatus.textContent = 'Menunggu Verifikasi';  // Asumsikan status default
        row.appendChild(tdStatus);

        // Menambahkan baris ke tabel
        tableBody.appendChild(row);
    });
}

// Fungsi untuk mengupdate tanggal transaksi dengan tanggal hari ini
function setTransactionDate() {
    const dateInput = document.getElementById('transaction-date');
    
    const now = new Date(); // Mendapatkan tanggal dan waktu saat ini

    // Format tanggal dengan bulan dan tahun
    const day = String(now.getDate()).padStart(2, '0'); // Menambahkan leading zero jika hari kurang dari 10
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi tambahkan 1
    const year = now.getFullYear();

    // Format lengkap: DD/MM/YYYY
    const formattedDate = `${day}/${month}/${year}`;

    // Set nilai tanggal pada input tanggal transaksi
    dateInput.value = formattedDate;
}

// Panggil fungsi setTransactionDate saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    setTransactionDate();
});

// Validasi dan pengiriman Form Transaksi
function validateTransactionForm(event) {
    event.preventDefault();  // Mencegah form dikirim secara default

    // Mendapatkan nilai input form
    const transactionName = document.getElementById('transaction-name').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    // Validasi input
    if (transactionName === "" || amount === "" || category === "") {
        alert("Semua kolom harus diisi!");
        return false;
    }

    // Membuat objek transaksi
    const transaction = {
        name: transactionName,
        amount: amount,
        category: category,
        date: document.getElementById('transaction-date').value // Menyertakan tanggal transaksi
    };

    // Ambil daftar transaksi yang sudah ada di LocalStorage (jika ada)
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Tambahkan transaksi baru ke daftar
    transactions.push(transaction);

    // Simpan daftar transaksi kembali ke LocalStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Reset form
    document.getElementById('transaction-form').reset();

    // Memperbarui daftar transaksi
    displayTransactions();

    return false;
}

// Menangani pengiriman form transaksi
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    validateTransactionForm(event);
});


//registrasi
function validateRegistrationForm() {
    // Menyembunyikan pesan error sebelumnya
    document.getElementById('full-name-error').style.display = 'none';
    document.getElementById('phone-email-error').style.display = 'none';
    document.getElementById('address-error').style.display = 'none';
    document.getElementById('password-error').style.display = 'none';
    document.getElementById('identity-number-error').style.display = 'none';
    document.getElementById('account-number-error').style.display = 'none';
    document.getElementById('bank-error').style.display = 'none';

    let valid = true;

    // Mendapatkan nilai input
    const fullName = document.getElementById('full-name').value;
    const phoneEmail = document.getElementById('phone-email').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const identityNumber = document.getElementById('identity-number').value;
    const accountNumber = document.getElementById('account-number').value;
    const bank = document.getElementById('bank').value;

    // Validasi Nama Lengkap
    if (fullName === "") {
        document.getElementById('full-name-error').textContent = "Nama lengkap harus diisi.";
        document.getElementById('full-name-error').style.display = 'block';
        valid = false;
    }

    // Validasi Nomor HP / Email
    if (phoneEmail === "") {
        document.getElementById('phone-email-error').textContent = "Nomor HP / Email harus diisi.";
        document.getElementById('phone-email-error').style.display = 'block';
        valid = false;
    }

    // Validasi Alamat
    if (address === "") {
        document.getElementById('address-error').textContent = "Alamat harus diisi.";
        document.getElementById('address-error').style.display = 'block';
        valid = false;
    }

    // Validasi Password
    if (password === "") {
        document.getElementById('password-error').textContent = "Password harus diisi.";
        document.getElementById('password-error').style.display = 'block';
        valid = false;
    }

    // Validasi No Identitas
    if (identityNumber === "") {
        document.getElementById('identity-number-error').textContent = "Nomor identitas harus diisi.";
        document.getElementById('identity-number-error').style.display = 'block';
        valid = false;
    }

    // Validasi Nomor Rekening
    if (accountNumber === "") {
        document.getElementById('account-number-error').textContent = "Nomor rekening harus diisi.";
        document.getElementById('account-number-error').style.display = 'block';
        valid = false;
    }

    // Validasi Bank
    if (bank === "") {
        document.getElementById('bank-error').textContent = "Pilih bank.";
        document.getElementById('bank-error').style.display = 'block';
        valid = false;
    }

    // Jika semua input valid, simpan data registrasi ke localStorage
    if (valid) {
        const user = {
            fullName,
            phoneEmail,
            password,
            identityNumber,
            accountNumber,
            bank
        };
        localStorage.setItem('user', JSON.stringify(user));  // Menyimpan user sebagai string JSON
    }

    // Mengembalikan nilai validasi
    return valid;
}


document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah pengiriman form default
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Validasi data login
            const storedUserData = JSON.parse(localStorage.getItem('user')) || {};

            if (storedUserData && storedUserData.fullName === username && storedUserData.password === password) {
                window.location.href = 'transaksi.html';
            } else {
                alert('Username atau password salah.');
            }
        });
    } else {
        console.error('Form login tidak ditemukan.');
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Fungsi untuk mengupdate tanggal transaksi dengan tanggal hari ini
    function setTransactionDate() {
        const dateInput = document.getElementById('transaction-date');
        
        const now = new Date(); // Mendapatkan tanggal dan waktu saat ini

        // Format tanggal dengan bulan dan tahun
        const day = String(now.getDate()).padStart(2, '0'); // Menambahkan leading zero jika hari kurang dari 10
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi tambahkan 1
        const year = now.getFullYear();

        // Format lengkap: DD/MM/YYYY
        const formattedDate = `${day}/${month}/${year}`;

        // Set nilai tanggal pada input tanggal transaksi
        dateInput.value = formattedDate;
    }

    // Panggil fungsi setTransactionDate saat halaman dimuat
    setTransactionDate();
});

//forgot password

let countdown;
let timeLeft = 60;

function startTimer() {
    const resendButton = document.getElementById('resend-code');
    const timerDisplay = document.getElementById('timer');

    resendButton.disabled = true; // Disable button during countdown
    countdown = setInterval(function() {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Kode verifikasi akan kedaluwarsa dalam: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            resendButton.disabled = false; // Enable button again after countdown ends
            timeLeft = 60; // Reset the countdown time
            timerDisplay.textContent = "Kode verifikasi sudah kedaluwarsa. Klik 'Kirim Ulang Kode Verifikasi'.";
        }
    }, 1000);
}

document.getElementById('reset-password-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Instruksi reset password telah dikirim ke email Anda.');
});
