let slideAtual = 0;
let transitando = false;

const slides = document.querySelectorAll(".slide");

function irParaSlide(index) {
    if (transitando || index === slideAtual) return;
    transitando = true;

    const slideAtualEl = slides[slideAtual];
    const proxSlide = slides[index];

    const tl = gsap.timeline({
        onComplete: () => {
            slideAtualEl.classList.remove("ativo");
            gsap.set(slideAtualEl, { x: "0%", zIndex: "" });
            gsap.set(slideAtualEl.querySelector(".slide-bg"), { width: "50%" });
            gsap.set(slideAtualEl.querySelectorAll(".conteudo h1, .conteudo p, .conteudo button, .nutrientes, .latas-nav"), { opacity: 1 });
            gsap.set(slideAtualEl.querySelectorAll(".lata"), { y: 0, opacity: 1 });
            slideAtual = index;
            transitando = false;
        }
    });

    const conteudoAtual = slideAtualEl.querySelectorAll(
        ".conteudo h1, .conteudo p, .conteudo button, .nutrientes, .latas-nav"
    );
    const lataAtual = slideAtualEl.querySelector(".lata");
    const bgAtual = slideAtualEl.querySelector(".slide-bg");

    const bgProx = proxSlide.querySelector(".slide-bg");
    const conteudoProx = proxSlide.querySelectorAll(
        ".conteudo h1, .conteudo p, .conteudo button, .nutrientes, .latas-nav"
    );
    const lataProx = proxSlide.querySelector(".lata");

    gsap.set(conteudoProx, { opacity: 0 });
    gsap.set(bgProx, { width: "0%" });
    gsap.set(lataProx, { y: 200, opacity: 0 });
    gsap.set(slideAtualEl, { zIndex: 5 });

    proxSlide.classList.add("ativo");

    // Phase 1 - Leave
    tl.to(conteudoAtual, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
    });

    tl.to(lataAtual, {
        y: 200,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
    }, "-=0.2");

    tl.to(bgAtual, {
        width: "100%",
        duration: 0.5,
        ease: "power2.inOut"
    }, "-=0.1");

    tl.to(slideAtualEl, {
        x: "100%",
        duration: 0.5,
        ease: "power2.inOut"
    });

    // Phase 2 - Enter
    tl.to(bgProx, {
        width: "50%",
        duration: 0.5,
        ease: "power2.out"
    });

    tl.to(conteudoProx, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
    }, "-=0.2");

    tl.to(lataProx, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.3");
}

function proximoSlide() {
    const next = slideAtual === slides.length - 1 ? 0 : slideAtual + 1;
    irParaSlide(next);
}

function slideAnterior() {
    const prev = slideAtual === 0 ? slides.length - 1 : slideAtual - 1;
    irParaSlide(prev);
}

document.querySelectorAll(".btn-nav:last-child").forEach((btn) => {
    btn.addEventListener("click", proximoSlide);
});

document.querySelectorAll(".btn-nav:first-child").forEach((btn) => {
    btn.addEventListener("click", slideAnterior);
});
