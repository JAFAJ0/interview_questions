#include <stdio.h>

#include <stdlib.h>

#include <stdarg.h>

#include "mulstack.h"

/*  Use the struct as a class in OO to store variables in different types  */

struct muls_element {

  enum muls_type type;

  union {

    char v_c;

    short v_s;

    int v_i;

    long v_l;

    float v_f;

    void * v_p;

  }
  data;

};

/*  Struct to contain stack 'muls_element'  */

struct stack {

  size_t top;

  size_t capacity;

  enum muls_type type;

  struct muls_element * elements;

};

/*  The easiest part, delete the stack and free its memory  */

void
muls_free(struct stack * stack) {

  free(stack -> elements);

  free(stack);

}

/*  Returns true if the stack is empty  */

bool muls_is_empty(struct stack * stack) {

  return stack -> top == 0;

}

/*  Returns true if the stack is full  */

bool muls_is_full(struct stack * stack) {

  return stack -> top == stack -> capacity;

}

/*  Initialize and returns a new stack of muls_element with fixed capacity  */

struct stack *
  muls_init(const size_t capacity) {

    struct stack * new_stack = malloc(sizeof * new_stack);

    if (!new_stack) {

      perror("NO available memory for this stack");

      exit(EXIT_FAILURE);

    }

    new_stack -> capacity = capacity;

    new_stack -> top = 0;

    new_stack -> elements = malloc(sizeof * new_stack -> elements * capacity);

    if (!new_stack -> elements) {

      free(new_stack);

      perror("No available memory for muls_element");

      exit(EXIT_FAILURE);

    }

    return new_stack;

  }

/*  Pushes an element into the stack  */

void
muls_push(struct stack * stack,
  const enum muls_type type, ...) {

  if (muls_is_full(stack)) {

    fprintf(stderr, "Stack is full!\n");

    exit(EXIT_FAILURE);

  }

  va_list a_list;

  va_start(a_list, type);

  switch (type) {

  case MULS_CHAR:

    stack -> elements[stack -> top].data.v_c = (char) va_arg(a_list, int);

    break;

  case MULS_SHORT:

    stack -> elements[stack -> top].data.v_s = (char) va_arg(a_list, int);

    break;

  case MULS_INT:

    stack -> elements[stack -> top].data.v_i = va_arg(a_list, int);

    break;

  case MULS_LONG:

    stack -> elements[stack -> top].data.v_l = va_arg(a_list, long);

    break;

  case MULS_FLOAT:

    stack -> elements[stack -> top].data.v_f = (float) va_arg(a_list, double);

    break;

  case MULS_POINTER:

    stack -> elements[stack -> top].data.v_p = va_arg(a_list, void * );

    break;

  default:

    fprintf(stderr, "Input type out of range when pushing\n");

    exit(EXIT_FAILURE);

  }

  stack -> elements[stack -> top++].type = type;

  va_end(a_list);

}

/*  Pops an element from the stack  */

void
muls_pop(struct stack * stack, void * p) {

  if (muls_is_empty(stack)) {

    fprintf(stderr, "Stack is empty!\n");

    exit(EXIT_FAILURE);

  }

  switch (stack -> elements[--stack -> top].type) {

  case MULS_CHAR:

    *
    ((char * ) p) = stack -> elements[stack -> top].data.v_c;

    break;

  case MULS_INT:

    *
    ((int * ) p) = stack -> elements[stack -> top].data.v_i;

    break;

  case MULS_SHORT:

    *
    ((short * ) p) = stack -> elements[stack -> top].data.v_s;

    break;

  case MULS_LONG:

    *
    ((long * ) p) = stack -> elements[stack -> top].data.v_l;

    break;

  case MULS_FLOAT:

    *
    ((float * ) p) = stack -> elements[stack -> top].data.v_f;

    break;

  case MULS_POINTER:

    *
    ((void ** ) p) = stack -> elements[stack -> top].data.v_p;

    break;

  default:

    fprintf(stderr, "Input type out of range when poping\n");

    exit(EXIT_FAILURE);

  }

}

enum muls_type
muls_type_peek(struct stack * stack) {

  if (stack -> top == 0) {

    fprintf(stderr, "Stack is empty!\n");

    exit(EXIT_FAILURE);

  }

  return stack -> elements[stack -> top - 1].type;

}