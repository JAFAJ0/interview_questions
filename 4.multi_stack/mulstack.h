#ifndef MULSTACK_H
#define MULSTACK_H

#include <stdbool.h>

enum muls_type {
  MULS_CHAR,
  MULS_SHORT,
  MULS_INT,
  MULS_LONG,
  MULS_FLOAT,

  MULS_POINTER
};

typedef struct stack * Stack;

Stack muls_init(const size_t capacity);

void muls_free(Stack stack);

void muls_push(Stack stack,
  const enum muls_type type, ...);

void muls_pop(Stack stack, void * p);

enum muls_type muls_type_peek(Stack stack);

bool muls_is_empty(Stack stack);

bool muls_is_full(Stack stack);

#endif /* MULSTACK_H*/