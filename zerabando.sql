-- Remove os palpites primeiro (por causa da chave estrangeira)
delete from public.bets;

-- Depois remove as partidas
delete from public.matches;

-- Zerar os pontos de cada usuário
UPDATE public.profiles SET total_points = '0';


-- zerar todos os palpites
truncate table public.bets;



-- ////////////////////////////////////;


-- Atribui rodada 1 aos jogos de 11 a 17 de junho
update public.matches set round = 1
where date(match_date) between '2026-06-11 00' and '2026-06-17';

-- Atribui rodada 2 aos jogos de 18 a 23 de junho
update public.matches set round = 2
where date(match_date) between '2026-06-18' and '2026-06-23';

-- Atribui rodada 3 aos jogos de 20 a 26 de junho
update public.matches set round = 3
where date(match_date) between '2026-06-24' and '2026-06-27';

-- Confirma
select round, count(*) from public.matches group by round order by round;
```

O resultado deve ser:
```
round | count
  1   |  24
  2   |  24
  3   |  24