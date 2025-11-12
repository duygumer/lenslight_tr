// getIndexPage fonksiyonu → ana sayfayı göstermek için
const getIndexPage = (req, res) => {

    console.log("REQUEST USER:::", req.user);  // doğrulanan kullanıcı bilgilerini konsola yazdır

    // res.render → ejs dosyasını alıp tarayıcıya gönderir
    res.render('index', {          // views klasöründeki index.ejs dosyasını aç
        link: "index"              // index.ejs dosyasına link adında bir değişken gönderiyoruz
    });
};


const getAboutPage = (req, res) => {
    res.render('about', {          
        link: "about"              
    });
};

const getRegisterPage = (req, res) => {
    res.render('register', {      
        link: "register"           
    });
};


const getLoginPage = (req, res) => {
    res.render('login', {          
        link: "login"            
    });
};

const getLogout = (req, res) => {
     res.cookie('jwt', '', { 
        maxAge: 1 
    }); // JWT çereziyi sil
     res.redirect('/'); // Ana sayfaya yönlendir    
};


export { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout };
