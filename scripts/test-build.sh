#!/bin/bash
PORT=4200

echo "==============================="
echo "Ejecutando tests unitarios..."
echo "==============================="


ng test --watch=false --browsers=ChromeHeadless
UNIT_RESULT=$?

if [ $UNIT_RESULT -ne 0 ]; then
  echo "Tests unitarios fallaron con código $UNIT_RESULT"
  exit $UNIT_RESULT
fi

echo "==============================="
echo "Iniciando servidor Angular..."
echo "==============================="

ng serve --port=$PORT --configuration development > /dev/null 2>&1 &
NG_PID=$!

echo "Esperando que Angular este disponible en http://localhost:$PORT ..."
until curl -s http://localhost:$PORT > /dev/null; do
  sleep 1
done

echo "==============================="
echo "Ejecutando Cypress (headless)..."
echo "==============================="


npx cypress run
CYPRESS_RESULT=$?

echo "==============================="
echo "Cerrando servidor Angular..."
echo "==============================="


if lsof -i tcp:$PORT > /dev/null 2>&1; then
  kill $(lsof -t -i tcp:$PORT)
  echo "Servidor en puerto $PORT cerrado correctamente"
else
  echo "Puerto $PORT ya estaba libre"
fi

if [ $CYPRESS_RESULT -ne 0 ]; then
  echo "❌ Cypress fallo con codigo $CYPRESS_RESULT"
  exit $CYPRESS_RESULT
fi

echo "==============================="
echo "Ejecutando build final..."
echo "==============================="


ng build
BUILD_RESULT=$?

if [ $BUILD_RESULT -ne 0 ]; then
  echo "Build fallo con codigo $BUILD_RESULT"
  exit $BUILD_RESULT
fi

echo "Todos los pasos finalizaron correctamente"
exit 0
